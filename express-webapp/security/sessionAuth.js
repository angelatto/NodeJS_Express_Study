const session = require("express-session");

const sessionAuth = {
    setAuth: function(req, res, userid) {
        // userid가 있다면 
        if(userid){
            // 세션에 userid를 저장 
            req.session.userid = userid;
        }
        // req에 추가적으로 userid를 저장 (편리성 - JWT 인증과 통일화)
        req.userid = req.session.userid;
        /*
         * 궁금 : 요청 헤더?에 저장하는거? 
         *
        /*
            응답에서 사용,  locals: 서버에서 사용
            이 코드를 사용하는 이유: 넌적스의 모든 뷰(템플릿)에서 userid를 바인딩할 수 있다. 
         */ 
        res.locals.userid = req.session.userid;
    },

    checkAuth: function(req, res, next){
        if(req.session.userid){
            next();
        } else {
            // REST API라면 403 에러를 발생시켜줘야 한다!! 주의  
            // const error = new Error("인증 필요");
            // error.status = 403;
            // next(error);
            // 여기는 서버로 html까지 랜더링해주는 MPA 어플리케이션이기 때문에 로그인 폼 제공. 
            res.redirect("/exam12/loginForm");
        }
    },

    removeAuth: function(req){
        delete req.session.userid;
    }

};

module.exports = sessionAuth;