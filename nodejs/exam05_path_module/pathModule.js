const path = require("path");

console.log("현재 디렉토리: ", __dirname);
console.log("현재 디렉토리: ", path.dirname(__filename));
console.log("현재 파일의 확장명: ", path.extname(__filename));
console.log("현재 파일명: ", path.basename(__filename));
console.log("현재 파일명(확장명 제외): ", path.basename(__filename,  path.extname(__filename))); 

console.log("경로 결합: ", path.join(__dirname, "..", "/exam01_hello", "/helloWorld.js"));
