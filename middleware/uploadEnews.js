const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.fieldname === "location_enews") { // if uploading resume
    if (
      file.mimetype.includes("application/pdf")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only PDF file.", false);
    }
  } else { // else uploading image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ){
      cb(null, true);
    } else {
      cb("Please upload only PNG or JPG file.", false);
    }
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/views/assets/e-news");
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "sampul_enews") {
      cb(null, `Sampul_${Date.now()}-${file.originalname}`);
    }else{
      cb(null, `File_${Date.now()}-${file.originalname}`);
    }
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
