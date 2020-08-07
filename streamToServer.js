/** Dependencies */
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
var FFmpeg = require('fluent-ffmpeg');
var fs = require('fs');
const Ffmpeg = require("fluent-ffmpeg");
/** Basic App Setup */
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 4000;

var outStream = fs.createWriteStream('output_path.mp4');


var command = new FFmpeg({
    // Source filename or input stream
    source: '/dev/video0',

    // Custom presets folder
    //preset: './presets',

    // Processing timeout in seconds, defaults to no timeout
    // You can disable the timeout by passing 0.
    timeout: 0,
})
.withNoAudio()
.withVideoBitrate('650k', true)
.withSize('?x720')
.applyAutopadding(true)
.withAspectRatio(1.33)
.keepPixelAspect(true)
//.toFormat('mp4')

// Set output FPS
//.withFps(24)
//.withFpsOutput(24)

// Add several input options at once

// Add several options at once
.addOptions(['-tune zerolatency', '-preset ultrafast', '-f h264'])
.on('error', err => {
    console.log('An error occurred: ' + err.message);
})
.on('end', function() {
    console.log('Processing finished!');
})
command.writeToStream(outStream, { end: true });
console.log(command);