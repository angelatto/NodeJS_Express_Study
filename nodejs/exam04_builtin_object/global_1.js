const timerId = global.setInterval(() => {
    console.log(new Date().toLocaleString());

}, 1000);

global.setTimeout(() => {
    global.clearInterval(timerId);
}, 5000);

// 여기 왜 중괄호 붙여야함 ??? 
// 파일 다 가져오는게 아니라 구조분해할당으로 함수만 가져오니까 
const {setUserId} = require("./global_2");
setUserId("user1");

console.log(global.userId, userId);
fun1();