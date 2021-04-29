// 구조분해할당으로 사용하고 싶은 클래스만 가져옴 
const {URL} = require("url");
console.log(URL);

const strUrl = "http://www.mycompany.com:8080/xxx/100?param1=1&param2=3&param2=4#bottom";
const url = new URL(strUrl);

console.log(url.protocol);
console.log(url.hostname);
console.log(url.port);
console.log(url.pathname);
console.log(url.searchParams.get("param1"));
console.log(url.searchParams.getAll("param2"));
console.log(url.hash);