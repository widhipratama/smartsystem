const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.fieldname === "location_how") { // if uploading resume
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
    cb(null, __basedir + "/views/assets/how");
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "sampul_how") {
      cb(null, `Sampul_${Date.now()}`);
    }else{
      cb(null, `File_${Date.now()}`);
    }
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
