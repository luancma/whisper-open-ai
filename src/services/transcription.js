const transcription = async (fileName, service = "openAI") => {
  if (service === "openAI") {
    const asyncWhisperTranscription = require("../libs/openAI/asyncWhisperTranscription");
    await asyncWhisperTranscription({ fileName });
  }
};

exports.transcription = transcription;
