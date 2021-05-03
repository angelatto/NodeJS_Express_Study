const express = require("express");

const router = express.Router();
router.get("", (req, res, next) => {
    console.log("router come here");
    const board = {bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"user1", bdate:"2021.5.11"};
    res.render("exam05_middleware", {board});

    // const err = new Error("요청 처리 문제 발생 123");
    // next(err);
});

module.exports = router;