require("dotenv").config(); // this loads env vars

const { Client, MessageMedia } = require("whatsapp-web.js");
const { phoneNumberFormatter } = require("./helpers/formatter");
const express = require("express");
const expressValidator = require("express-validator");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

var path = require("path");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

global.__basedir = __dirname;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(expressValidator());
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(flash());

app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/script-stisla", express.static(path.join(__dirname, "/admin-stisla/")));
app.use("/assets", express.static(path.join(__dirname, "/views/assets/")));
app.use(function (req, res, next) {
  res.locals.stuff = {
    url: req.originalUrl,
  };
  next();
});

const sessions = [];
const SESSIONS_FILE = "./session/whatsapp-sessions.json";

const createSessionsFileIfNotExists = function () {
  if (!fs.existsSync(SESSIONS_FILE)) {
    try {
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify([]));
      console.log("Sessions file created successfully.");
    } catch (err) {
      console.log("Failed to create sessions file: ", err);
    }
  }
};

createSessionsFileIfNotExists();

const setSessionsFile = function (sessions) {
  fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

const getSessionsFile = function () {
  return JSON.parse(fs.readFileSync(SESSIONS_FILE));
};

const createSession = function (id) {
  console.log("Creating session: " + id);
  const SESSION_FILE_PATH = `./session/whatsapp-session-${id}.json`;
  let sessionCfg;
  if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
  }

  const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process", // <- this one doesn't works in Windows
        "--disable-gpu",
      ],
    },
    session: sessionCfg,
  });

  client.initialize();

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.toDataURL(qr, (err, url) => {
      io.emit("qr", { id: id, src: url });
      io.emit("message", { id: id, text: "QR Code received, scan please!" });
    });
  });

  client.on("ready", () => {
    io.emit("ready", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is ready!" });

    const savedSessions = getSessionsFile();
    const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);
    savedSessions[sessionIndex].ready = true;
    setSessionsFile(savedSessions);
  });

  client.on("authenticated", (session) => {
    io.emit("authenticated", { id: id });
    io.emit("message", { id: id, text: "Whatsapp is authenticated!" });
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  client.on("auth_failure", function (session) {
    io.emit("message", { id: id, text: "Auth failure, restarting..." });
  });

  client.on("disconnected", (reason) => {
    io.emit("message", { id: id, text: "Whatsapp is disconnected!" });
    fs.unlinkSync(SESSION_FILE_PATH, function (err) {
      if (err) return console.log(err);
      console.log("Session file deleted!");
    });
    client.destroy();
    client.initialize();

    // Menghapus pada file sessions
    const savedSessions = getSessionsFile();
    const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);
    savedSessions.splice(sessionIndex, 1);
    setSessionsFile(savedSessions);

    io.emit("remove-session", id);
  });

  // Tambahkan client ke sessions
  sessions.push({
    id: id,
    client: client,
  });

  // Menambahkan session ke file
  const savedSessions = getSessionsFile();
  const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);

  if (sessionIndex == -1) {
    savedSessions.push({
      id: id,
      ready: false,
    });
    setSessionsFile(savedSessions);
  }
};

const init = function (socket) {
  const savedSessions = getSessionsFile();

  if (savedSessions.length > 0) {
    if (socket) {
      socket.emit("init", savedSessions);
    } else {
      savedSessions.forEach((sess) => {
        createSession(sess.id);
      });
    }
  }
};

init();

// Socket IO
io.on("connection", function (socket) {
  init(socket);

  socket.on("create-session", function (data) {
    console.log("Create session: " + data.id);

    createSession(data.id);
  });
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    req.flash("login_message", "Forbidden Access");
    req.flash("login_status", "403");
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    app.locals = {
      auth: {
        username: payload.username,
        nama: payload.nama,
        level: payload.level ? payload.level : "USER",
      },
    };
  } catch (e) {
    app.locals = {
      auth: {
        username: "USER",
        nama: "USER",
        level: "USER",
      },
    };
  }

  next();
});

const authRoute = require("./modules/auth/routes/authRoute");
const whatsappRoute = require("./routes/whatsapp");
const custfleetRoute = require("./routes/custfleet");
const custfirstRoute = require("./routes/custfirst");
const nextserviceRoute = require("./routes/nextservice");
const enewsRoute = require("./routes/enews");
const toyotahowRoute = require("./routes/toyotahow");
const carsRoute = require("./routes/cars");
const promotionRoute = require("./routes/promotion");
const customerRoute = require("./routes/customer");
const jobHistoryRoute = require("./routes/jobHistory");
const progressStatusRoute = require("./routes/progressStatus");
const userRoute = require("./routes/user");

// routes
app.use("/", router);
app.use("/auth", authRoute);
app.use("/whatsapp", whatsappRoute);
app.use("/custfleet", custfleetRoute);
app.use("/custfirst", custfirstRoute);
app.use("/nextservice", nextserviceRoute);
app.use("/enews", enewsRoute);
app.use("/toyotahow", toyotahowRoute);
app.use("/cars", carsRoute);
app.use("/promotion", promotionRoute);
app.use("/customer", customerRoute);
app.use("/job-history", jobHistoryRoute);
app.use("/progress-status", progressStatusRoute);
app.use("/user", userRoute);

app.post("/send-message", (req, res) => {
  const sender = "smartsystem";
  const phone = phoneNumberFormatter(req.body.phone);
  const message = req.body.message;

  const client = sessions.find((sess) => sess.id == sender).client;

  // const isRegisteredNumber = await client.isRegisteredUser(phone);

  // if (!isRegisteredNumber) {
  //   return res.status(422).json({
  //     status: false,
  //     response: "The phone is not registered",
  //   });
  // }

  client
    .sendMessage(phone, message)
    .then((response) => {
      res.status(200).json({
        status: true,
        response: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        response: err,
      });
    });
});

//app.listen(port, () => console.log(`Server starts on ${port}`));

server.listen(port, function () {
  console.log("App running on *: " + port);
});
