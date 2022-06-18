const fs = require("fs");
const zlib = require("zlib");
require("dotenv").config();

const inputFile = process.env.INPUT_FILE;
const outputFile = process.env.OUTPUT_FILE;

const compressFile = (path) => {
  const handleStream = fs.createReadStream(path);
  handleStream
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(outputFile))
    .on("finish", () => {
      console.log(`Compression process done: ${path}`);
    });
};
compressFile(inputFile);
