const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gauravmahato121209@gmail.com',
    pass: 'YOUR_APP_PASSWORD'
  }
});

app.post('/send-email', async (req, res) => {
  const { email, image } = req.body;

  const base64Data = image.replace(/^data:image\/png;base64,/, '');

  const mailOptions = {
    from: 'gauravmahato121209@gmail.com',
    to: email,
    subject: 'Your Captured Photo',
    text: 'Here is your captured photo.',
    attachments: [
      {
        filename: 'photo.png',
        content: base64Data,
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
