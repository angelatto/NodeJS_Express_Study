console.log("프로그램 실행");

// 너는 npm에서 설치한 외부 모듈 bcrypt이다. 
// API 사용법을 찾아보면 require뒤에 아무것도 붙이지 않아도 된다. 
const bcrypt = require("bcrypt");

(async () => {
    try{
        const cryptedPassword = await bcrypt.hash("12345", 12);
        console.log(cryptedPassword);
        const result = await bcrypt.compare("12345", cryptedPassword);
        console.log("Result: " + result);
    }catch(err){

    }
})();