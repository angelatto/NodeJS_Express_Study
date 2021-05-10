const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    res.render("exam08_cookie/index", {});
});

router.get("/createCookie", (req, res, next) => {
    const user = {uid:"user1", uname:"이채정"}; 
    /* 자바스크립트 객체는 쿠키안에 저장할 수 없다. 
      쿠키는 오직 문자열만 저장할 수 있다.  */
    const strUser = JSON.stringify(user);
    res.cookie("user", strUser, {
        domain: "localhost",
        path: "/",
        expires: new Date(new Date().getTime() + 1000*60*30),
        signed: true, // 서버가 서명을 해서 쿠키의 값을 변형하지 못하도록 설정 
        httpOnly: true, // 클라이언트의 JS가 쿠키에 접근하지 못하도록 방지 
        secure: false // http, https 모두 쿠키를 전송할 수 있도록 설정 
    }); // 쿠키를 응답 헤더에 저장, 옵션 지정 , 1분 * 30 = 30분 뒤
    res.redirect("/exam08");
});

router.get("/readCookie", (req, res, next) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    const user = JSON.parse(req.signedCookies.user);
    res.render("exam08_cookie/readCookie", {user});
});

module.exports = router;