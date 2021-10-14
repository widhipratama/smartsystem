const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("image/png") ||
    file.mimetype.includes("image/jpg") ||
    file.mimetype.includes("image/jpeg")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only JPG and PNG file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/views/assets/e-news/sampul");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
