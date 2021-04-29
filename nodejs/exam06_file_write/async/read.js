const fs = require("fs");
//const data = fs.readFileSync("./data.txt");

fs.readFile("./data.txt", (err, data) => {
    console.log(data);
    console.log(data.toString());

});
console.log("다른 작업 실행");