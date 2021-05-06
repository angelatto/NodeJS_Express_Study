// 모듈 가져오기 
const express = require("express");
const boardService = require("../services/board-service");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", async (req, res, next)=> {
    try{
        //const result = await boardService.totalRows(); // 결과값을 가져와서 이용해야 하니까,,프로미스 노노 
        const result = await boardService.list();
        console.log(result);
        res.render("exam11_sequelize"); 
    }catch(error){
        next(error);
    }
 
});


module.exports = router;
