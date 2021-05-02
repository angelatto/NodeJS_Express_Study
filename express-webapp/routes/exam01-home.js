// 모듈 가져오기 
const express = require("express");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", (req, res)=> {
    res.render("exam01_home");  // view name을 제공 
    // views와 .html이 생략되어있다 설정은 app.js에 있다. 
});

// 모든 라우터는 모듈로 만들어져야 한다. 그래야 app.js에서 라우터 모듈 가져와서 설정할 수 있음. 
module.exports = router;

/*
 * 요청이 들어왔을 때 어떻게 처리하겠다고 지정하는 공간.
 */