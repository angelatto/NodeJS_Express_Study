const fs = require("fs").promises;

fs.readFile("./data.txt")
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.log(err);
    });
console.log("다른 작업 실행");