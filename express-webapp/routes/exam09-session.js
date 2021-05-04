const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
   // const uid = req.session.uid; 안넘겨줘도됨 
    res.render("exam09_session");
});

router.post("/login", (req, res, next) => {
    const user = req.body;  // 아이디, 패스워드 검증했다 치고..
    console.log(user);
    // 세션에 uid를 저장 
    req.session.uid = user.uid; // 주의 : res가 아님 
    res.redirect("/exam09");
});

router.get("/logout", (req, res, next) => {
    delete req.session.uid; // 주의 : res가 아님 
    res.redirect("/exam09");
});

/* 
넌적스는 세션에 있는 것을 명시적으로 넘겨줘야 한다. 
스프링처럼 ${}로 바로 알수는 없다. 
그래서 그것이 가능하도록 app.js에서 미들웨어 설정을 해줬다.
res.locals에 저장해두기!!! 기억!! 
 */

module.exports = router;