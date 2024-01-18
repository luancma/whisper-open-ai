require('dotenv').config()
const fs = require("fs");
const express = require("express");
const path = require("path");
const { applyMulter } = require("./libs/multer");
const { UPLOADS_FOLDER, SUPPORTED_FILE_FORMATS } = require("./constants");
const { transcription } = require("./services/transcription");

const app = express();
app.use(express.static("public"));
app.post("/upload", applyMulter, async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const tempPath = req.file.path;
  const fileFormat = path.extname(req.file.originalname).toLowerCase();
  const fileName = req.file.originalname;
  const targetPath = path.join(__dirname, "..", UPLOADS_FOLDER + fileName);

  if (!SUPPORTED_FILE_FORMATS.includes(fileFormat)) {
    res.status(400).send("Unsupported file format.");
  }

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      return handleError(err, res);
    }
  });

  transcription(fileName)
    .then(() => {
      res.send("File uploaded and processed!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error during transcription.");
    });
});

const SERVER_PORT = process.env.SERVER_PORT || 3000
app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}`));
