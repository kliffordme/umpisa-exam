const multer = require('multer');

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for uploaded files
  }
});

// Initialize multer middleware with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
