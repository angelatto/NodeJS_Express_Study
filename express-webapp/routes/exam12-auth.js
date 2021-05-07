const express = require("express");
const userService = require("../services/user-service");

const router = express.Router();

router.get("", (req, res, next) => {
    res.render("exam12_auth/index");

});

router.get("/loginForm", (req, res, next) => {
    res.render("exam12_auth/loginForm");

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

module.exports = router;
