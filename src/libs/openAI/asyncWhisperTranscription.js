const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const {
  OUTPUT_FOLDER,
  UPLOADS_FOLDER,
  OUTPUT_FORMAT,
} = require("../../constants");
const path = require("path");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const asyncWhisperTranscription = async ({ fileName }) => {
  const openai = new OpenAIApi(configuration);
  const fileP = path.join(__dirname, "../../..", UPLOADS_FOLDER, fileName);
  const response = await openai.createTranscription(
    fs.createReadStream(fileP),
    "whisper-1",
    undefined,
    "json",
    undefined,
    undefined,
    {
      maxBodyLength: Infinity,
    }
  );
  const nameWithoutExtension = fileName.split(".")[0];
  fs.writeFileSync( 
    path.join(
      __dirname,
      "../../..",
      OUTPUT_FOLDER + nameWithoutExtension + OUTPUT_FORMAT
    ),
    JSON.stringify(response.data)
  );
};

module.exports = asyncWhisperTranscription;
