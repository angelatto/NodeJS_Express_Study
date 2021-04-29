const fs = require("fs").promises;
const data = "오늘은 수요일 data.txt 내용 읽는중5555";

// 함수 선언과 동시에 호출 
// 비동기 처리 안에서 동기방식이다. 
(async() => {
    try {
        await fs.writeFile("./data.txt", data);
        console.log("파일 저장 완료 ");
    } catch(err){
        console.log("파일 저장 실패 ");
        console.log(err);
    }
})();

console.log("다른 작업 실행");
