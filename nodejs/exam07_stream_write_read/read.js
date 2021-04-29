// highWaterMark : chunk 바이트 수 
/* 스트림 방식 (청크 단위로 읽고 지속적으로 전달함)
   장점1) 버퍼 방식과 다르게 메모리도 적게 쓰고, 처리 속도도 빨라진다. 
   장점2) 스트림 파이프를 만들 수 있다. 
*/
const fs = require("fs");
const readStream = fs.createReadStream("./data.txt", {highWaterMark: 9});

readStream.on("data", (chunk) => {
    console.log(chunk.toString());
});

readStream.on("end", () => {
    console.log("파일 읽기 성공 ");
});

readStream.on("error", (err) => {
    console.log("파일 읽기 실패 ");
    console.log(err);
});