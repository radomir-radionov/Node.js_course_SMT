const process = require("process");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const sharp = require("sharp");
const isImage = require("is-image");

const [width, height] = process.env.SIZE.split("x");
const inputFile = process.env.INPUT_FILE;
const outputFile = process.env.OUTPUT_FILE;

fs.readdir(outputFile, (err, files) => {
  if (files.length) {
    files.map((file) => {
      fs.unlink(path.join(outputFile, file), (err) => {
        if (err) throw err;
      });
    });
  }
});

fs.readdir(inputFile, (err, files) => {
  const filteredFiles = files.filter((file) => isImage(`./input_dir${file}`));
  filteredFiles.forEach((file) => {
    const absolutePath = path.resolve(inputFile, file);
    const inputBuffer = fs.readFileSync(absolutePath);
    const parsed = path.parse(outputFile);
    const target = path.resolve(
      __dirname,
      outputFile,
      `${parsed.name}_${Math.random()}.jpg`
    );
    sharp(inputBuffer)
      .resize(Number(width), Number(height))
      .toFile(target, (err, info) => {
        console.log(err, info);
      });
  });
});
