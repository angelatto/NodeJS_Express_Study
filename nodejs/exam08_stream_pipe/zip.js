const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./big.txt");
const zipStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./big2.zip");

writeStream.on("finish", () => {
  console.log("μμΆ μλ£");
});

readStream.pipe(zipStream).pipe(writeStream); 