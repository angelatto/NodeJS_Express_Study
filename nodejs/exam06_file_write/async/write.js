const fs = require("fs");
const data = "오늘은 수요일 data.txt 내용 읽는중33";

fs.writeFile("./data.txt", data, (err) =>{
    console.log("파일 저장이 완료됨");
});
console.log("다른 작업 실행");
