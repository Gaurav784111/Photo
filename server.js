app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    console.log("Upload received");

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    await transporter.sendMail({
      from: "gauravmahato121209@gmail.com",
      to: "gauravmahato121209@gmail.com",
      subject: "New Photo",
      text: "Photo received",
      attachments: [
        {
          filename: "photo.jpg",
          content: req.file.buffer
        }
      ]
    });

    console.log("Email sent");

    res.send("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});
