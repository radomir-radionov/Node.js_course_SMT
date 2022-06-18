const fs = require("fs");
const zlib = require("zlib");
const r = fs.createReadStream("./video/video_01.mp4");
const z = zlib.createGzip();
const w = fs.createWriteStream("./video/video_01.mp4.gz");
require("dotenv").config();

r.pipe(z).pipe(w);
