// 모듈 가져오기 
const express = require("express");
const board = require("../sequelize/models/board");
const { totalRows } = require("../services/board-service");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", async (req, res)=> {
    res.render("exam11_sequelize"); 
});

router.get("/path1", async (req, res, next) => {
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

router.get("/path2", async (req, res, next) => {
    try{
        const searchMethod = { // 유효성 검사했다치고..
            keyword: req.query.keyword, 
            column : req.query.column
        };
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await boardService.totalRows(searchMethod); // 비동기라서 await으로 결과 기다려주기 
        const pager = paging.init(5, 5, pageNo, totalRows);
        const boards = await boardService.list(pager, searchMethod);
        res.json({boards, pager});
    }catch(error){
        next(error);
    }
});

router.get("/path3", async (req, res, next) => {
    try{
        let {startBno, endBno} = req.query;
        startBno = startBno? parseInt(startBno): 1;
        endBno = endBno? parseInt(endBno): totalRows;
        const boards = await boardService.rangeList(startBno, endBno);
        res.json(boards);
    }catch(error){
        next(error);
    }
});

router.get("/path4", async (req, res, next) => {
    try{
        const bno = req.query.bno? parseInt(req.query.bno): 1;
        const board = await boardService.getBoard(bno);
        res.json(board);
    }catch(error){
        next(error);
    }
});

router.post("/path5", async (req, res, next) => {
    try{
        /* 
            const board = req.body;
            board.bwriter = "user1";
         */
        let board = {...req.body, bwriter: "user1"};
        board = await boardService.create(board); // 응답을 받으면 bno가 생긴다. 
        res.json(board);
    }catch(error){ 
        next(error); // AJAX 라서 에러페이지로 안넘어가..
    }
});

// get을 제외하고는 모두 쿼리스트링 방식으로 요청 바디에 실려서 전달된다. 
router.put("/path6", async (req, res, next) => {
    try{
        // const bno = parseInt(req.body.bno);
        // const btitle = req.body.btitle;
        // const bcontent = req.body.bcontent;
        // const board = {bno, btitle, bcontent};
        const board = {...req.body, bno:parseInt(req.body.bno)};
        const rows = await boardService.update(board); // 1이 나와야 정상이다. 
        res.json({result: rows+"행이 수정됨"}); // 큰따옴표 안감싸도댐?? 
    }catch(error){ 
        next(error); // AJAX 라서 에러페이지로 안넘어가..
    }
});

router.delete("/path7", async(req, res, next) => {
    try{
        const rows = await boardService.delete(parseInt(req.body.bno));
        res.json({result: rows+"행이 삭제됨"}); 
    }catch(error){
        next(error);
    }
});

router.get("/path8", async(req, res, next) => {
    try{
        const userid = req.query.userid; // get 방식이니까 쿼리에서 꺼내옴 
        const user = await boardService.getUserAndBoard(userid);
        res.json(user);

    }catch(error){
        next(error);
    }
});

module.exports = router;
