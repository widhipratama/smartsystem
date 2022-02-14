const path = require('path');
const multer = require('multer');

var multerStorage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, __basedir+'/uploads/');
    },
    filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
    }
});

var multerSigleUpload = multer({ storage: multerStorage });

module.exports = multerSigleUpload;

