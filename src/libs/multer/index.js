const path = require("path");
const multer = require("multer");
const { UPLOADS_FOLDER } = require("../../constants");

const folderPath = path.join(__dirname, "../../.." , UPLOADS_FOLDER)

const ORIGINAL_FILES_DIRECTORY = multer({ dest: folderPath });
const applyMulter = ORIGINAL_FILES_DIRECTORY.single("file");

exports.applyMulter = applyMulter;