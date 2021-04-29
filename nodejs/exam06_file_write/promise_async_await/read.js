// fs 모듈을 Node.JS Core Library에서 제공하는 내장 모듈이다.  

const fs = require("fs").promises;

// 함수 선언과 동시에 호출 
(async() => {
    try{
        const data = await fs.readFile("./data.txt");
        console.log(data.toString());
        console.log("파일 읽기 완료 ");
    }catch(err){
        console.log("파일 읽기 실패 ");
    }
})();

console.log("다른 작업 실행");