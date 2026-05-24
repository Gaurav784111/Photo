const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD",
  },
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    console.log("Upload received");

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    await transporter.sendMail({
      from: "gauravmahato121209@gmail.com",
      to: "gauravmahato121209@gmail.com",
      subject: "New Photo Received",
      text: "A new photo was uploaded.",
      attachments: [
        {
          filename: "photo.jpg",
          content: req.file.buffer,
        },
      ],
    });

    console.log("Email sent");

    res.send("Upload successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Upload failed");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
