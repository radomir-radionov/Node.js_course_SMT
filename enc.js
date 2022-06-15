const fs = require("fs");

const inputReadStream = fs.createReadStream("input.txt");
const outputWriteStream = fs.createWriteStream("output.txt");
const resultWriteStream = fs.createWriteStream("result.txt");

const defaultHandler = (err) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
};

inputReadStream
  .on("error", defaultHandler)
  .on("data", (chunk) => {
    outputWriteStream.write(chunk.toString("hex"));
  })
  .on("data", (chunk) => {
    resultWriteStream.write(chunk.toString("utf8"));
  });
