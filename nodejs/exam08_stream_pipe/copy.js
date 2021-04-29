const fs = require("fs");

const readStream = fs.createReadStream("./big.txt");
const writeStream = fs.createWriteStream("./big2.txt");

writeStream.on("finish", () => {
    console.log("복사 완료");
});

readStream.pipe(writeStream);