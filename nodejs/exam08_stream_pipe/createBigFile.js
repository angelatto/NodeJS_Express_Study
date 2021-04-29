const fs = require("fs");
const writeStream = fs.createWriteStream("./big.txt");
writeStream.on("finish", () => {
    console.log("파일 쓰기 완료");
});

for(let i=0; i<10000000; i++) {
    writeStream.write("오늘은 수요일입니다.");
}
writeStream.end();