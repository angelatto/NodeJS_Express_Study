// 모듈 가져오기 
const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", (req, res) => {
    res.render("exam13_cors");
});

router.get("/boardlist", jwtAuth.checkAuth, async (req, res, next)=> {
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await boardService.totalRows(); // 비동기라서 await으로 결과 기다려주기 
        const pager = paging.init(5, 5, pageNo, totalRows);
        const boards = await boardService.list(pager);
        res.json({boards, pager});
    }catch(error){
        next(error);
    }
});

module.exports = router;