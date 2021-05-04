const express = require("express");

const router = express.Router();
const multipartFormData = require("../utils/multipart-form-data");

router.get("", (req, res, next) => {
    console.log("exam07 router come here");
    res.render("exam07_multipart_form_data");
    
});

router.post("/upload1", multipartFormData.single("battach"), (req, res, next) => {
    console.log("exam07/upload1");
    console.log(req.body);
    console.log(req.file);
    res.redirect("/exam07");
});

// 동일한 이름으로 여러개 
router.post("/upload2", multipartFormData.array("battach"), (req, res, next) => {
    console.log("exam07/upload2");
    console.log(req.body);
    console.log(req.files);
    res.redirect("/exam07");
});

// 각각 다른이름으로 여러개 
router.post("/upload3", multipartFormData.fields([{name: "battach1"}, {name: "battach2"}]), (req, res, next) => {
    console.log("exam07/upload3");
    console.log(req.body);
    console.log(req.files);
    res.redirect("/exam07");
});

// AJAX - 리다이렉트 못함 , 이름이 같은 경우 
router.post("/upload4", multipartFormData.array("battach"), (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    const result = {charPart: req.body, filePart: req.files};
    res.json(result);
});

// AJAX - 리다이렉트 못함 , 이름이 다를 경우 
router.post("/upload5", multipartFormData.fields([{name: "battach1"}, {name: "battach2"}]), (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    const result = {charPart: req.body, filePart:req.files};
    res.json(result);
});

// 파일 다운로드 
router.get("/download", (req, res, next) => {
    const fileOriginalName = req.query.fileOriginalName;
    const fileSavePath = process.env.UPLOAD_PATH + req.query.fileSaveName;
    //res.set("Content-Disposition", "attachment; filename=\"" + fileOriginalName + "\";"); // 헤더 
    res.download(fileSavePath, fileOriginalName);
});

module.exports = router;
