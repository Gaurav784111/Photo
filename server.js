const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

// Gmail transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gauravmahato121209@gmail.com",
    pass: "yuka ckii tqhq dgbi",
  },
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Upload route
app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    console.log("Upload received");

    // Check file
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).send("No file uploaded");
    }

    // Send email
    await transporter.sendMail({
      from: "gauravmahato121209@gmail.com",
      to: "gauravmahato121209@gmail.com",
      subject: "New Camera Photo",
      text: "A new photo was uploaded from the website.",
      attachments: [
        {
          filename: "photo.jpg",
          content: req.file.buffer,
        },
      ],
    });

    console.log("Email sent successfully");

    return res.status(200).send("Upload successful");

  } catch (error) {

    console.error("ERROR:", error);

    return res.status(500).send("Upload failed");
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
