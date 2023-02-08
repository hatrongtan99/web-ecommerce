const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FOLDER_ACCESS);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const allowedImage = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), null);
  }
  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter: allowedImage,
});
