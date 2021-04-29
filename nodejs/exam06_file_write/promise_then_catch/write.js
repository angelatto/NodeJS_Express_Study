const fs = require("fs").promises;
const data = "오늘은 수요일 data.txt 내용 읽는중444";

fs.writeFile("./data.txt", data)
    .then(() => {
        console.log("파일 저장 완료 ");
    })
    .catch((err) => {
        console.log(err);
    });
console.log("다른 작업 실행");
