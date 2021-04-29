const fs = require("fs");
const data = "오늘은 수요일 data.txt 내용 읽는중2 ";

fs.writeFileSync("./data.txt", data);
console.log("파일 저장이 완료됨");
