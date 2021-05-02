// 모듈 가져오기 
const express = require("express");
// 라우터 객체 얻어야 함 
const router = express.Router();

// 요청과 함수를 매핑 
router.get("", (req, res)=>{
    const userId = "user1";
    const board = {bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"user1", 
                    bdate:"2021.5.11"};
    const boards = [];
    for(let i=0; i<=10; i++){
        boards.push({bno:i, btitle:"제목"+i, bcontent:"내용"+i, bwriter:"user"+i, 
        bdate:new Date()});
    }
    res.render("exam02_bind_if_for", {userId, boards}); // 뷰에 전달 , spring에서 model같은 역할 
});

// 반드시 모듈로 만들어야 한다. 
module.exports = router;