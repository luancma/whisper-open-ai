### How to run? 

#### For DEV : 
```
yarn install
yarn dev
```

#### Default: 
```
yarn install
yarn start
```

### How to use : 
After start the app, you can access an api client and send POST request with a file using the "multipart/form-data" on the Request Body
to send a file. 

curl --request POST \
  --url http://localhost:8989/upload \
  --header 'content-type: multipart/form-data' \
  --form file=@file

![image](https://github.com/luancma/whisper-open-ai/assets/17798410/cf314a13-3d4d-4511-9b54-1d340fd6d754)

After that you can access the folder whisper-app/public/output to check the transcription


### Accepted formats: 
SUPPORTED_FILE_FORMATS = [
  ".m4a",
  ".mp3",
  ".webm",
  ".mp4",
  ".mpga",
  ".wav",
  ".mpeg",
];
