const express = require("express");
const userService = require("../services/user-service");
const sessionAuth =  require("../security/sessionAuth");
const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.get("", (req, res, next) => {
    res.render("exam12_auth/index");

});

router.get("/loginForm", (req, res, next) => {
    // 로그인 실패시 리다이렉트해서 요청된 경우 에러 정보 얻기 
    let loginError = req.session.loginError;
    if(loginError){
        // 로그인 실패시 저장했던 에러 정보를 삭제
        // 사용자가 직접 /loginForm을 요청했을 때(리다이렉트 말고) 이전 에러 정보가 나오면 안되기 때문에 세션 삭제한다.
        delete req.session.loginError
    }else{
        // 사용자가 직접 /loginForm을 요청했을 때
        loginError = {}; // undefined로 안만드려고(뷰에서 에러나니까) 빈 객체 선언 .. 
    }
    res.render("exam12_auth/loginForm", {loginError});
});

router.get("/joinForm", (req, res, next) => {
    res.render("exam12_auth/joinForm");
});

//get 방식 제외하고는 바디로 넘어온다. 
router.post("/join", async (req, res, next) => {
    try{
        const user = req.body; 
        await userService.create(user);
        res.redirect("/exam12");
    }catch(error){
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try{
        const user = req.body;
        const result = await userService.login(user);
        if(result.id !== "success"){ 
            // 리다이렉트니까 세션에 데이터 저장 
            req.session.loginError = result;
            res.redirect("/exam12/loginForm");
        }else{ // 로그인 성공 
            // 1. 세션 인증일 경우 
            sessionAuth.setAuth(req, res, user.userid);
            // 2. JWT 인증일 경우 - 세가지 방법 중 쿠키에 저장하는 방법 이용 
            const authToken = jwtAuth.createJwt(user.userid);
            res.cookie("authToken", authToken, {
                domain:"localhost",
                path: "/",
                expires: new Date(Date.now() + 1000*60*30),
                signed: true,
                httpOnly: true,
                secure: false /* false: https */
            });

            // 리다이렉트 
            res.redirect("/exam12");
        }
    }catch(err){
        next(err);
    }
});

router.post("/login2", async (req, res, next) => {
    try{
        const user = req.body;
        const result = await userService.login(user);
        if(result.id !== "success"){ 
            // 리다이렉트니까 세션에 데이터 저장 
            req.session.loginError = result;
            res.redirect("/exam12/loginForm");
        }else{ // 로그인 성공 
            // 1. 세션 인증일 경우 
            sessionAuth.setAuth(req, res, user.userid);
            // 2. JWT 인증일 경우 - 세가지 방법 중 쿠키에 저장하는 방법 이용 
            const authToken = jwtAuth.createJwt(user.userid);
            res.cookie("authToken", authToken, {
                domain:"localhost",
                path: "/",
                expires: new Date(Date.now() + 1000*60*30),
                signed: true,
                httpOnly: true,
                secure: false /* false: https */
            });

            // AJAX - 리다이렉트 안됨 
            res.json({authToken, userid: user.userid});
        }
    }catch(err){
        next(err);
    }
});

router.get("/logout", (req, res, next) => {
    // 1. 세션 인증일 경우 
   sessionAuth.removeAuth(req);

   // 2. JWT 인증일 경우 - 3개 방식중 토큰을 쿠키에 저장하는 방식 이용 
    res.clearCookie("authToken");
   
   res.redirect("/");
});

module.exports = router;
