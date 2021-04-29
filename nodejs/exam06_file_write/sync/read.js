const fs = require("fs");
const data = fs.readFileSync("./data.txt");

console.log(data);
console.log(data.toString());