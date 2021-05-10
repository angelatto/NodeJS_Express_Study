const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    console.log("router come here");
    res.render("exam06_data_receive/index");
});

router.get("/getQueryString", (req, res, next) => {
    console.log("getQueryString router come here");
    console.log(req.query);
    const bno = parseInt(req.query.bno);
    const pageNo = parseInt(req.query.pageNo);
    res.redirect("/exam06");
});

router.get("/getPathVariable/:bno/:pageNo", (req, res, next) => {
    console.log("getPathVariable router come here");
    console.log(req.params);
    const bno = parseInt(req.params.bno);
    const pageNo = parseInt(req.params.pageNo);
    res.redirect("/exam06");
});

// AJAX 요청 보낸 것은 리다이렉트 불가능 
router.post("/postReceive", (req, res, next) => {
    console.log("postReceive router come here");
    console.log("req.body.btitle: " + req.body.btitle);
    console.log("req.body.bcontent: " + req.body.bcontent);
    const board = req.body;
    res.render("exam06_data_receive/postReceive", {board})
});

module.exports = router;