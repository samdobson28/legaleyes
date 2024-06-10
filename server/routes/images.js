const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const { file, body: { userId } } = req;
  if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
  }
  try {
      const newImage = new Image({
          filename: file.filename,
          contentType: file.mimetype,
          user: userId
      });
      await newImage.save();
      res.json({ message: 'File uploaded and saved to MongoDB!' }); // Send JSON response
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading the file.' }); // Send JSON error response
  }
});



module.exports = router;
