const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No photo uploaded');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Uploaded Photo',
      text: 'Photo received from website.',
      attachments: [
        {
          filename: 'photo.jpg',
          content: req.file.buffer
        }
      ]
    });

    res.send('Photo uploaded successfully');

  } catch (error) {
    console.error(error);
    res.status(500).send('Upload failed');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
