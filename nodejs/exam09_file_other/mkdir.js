const fs = require("fs").promises;

// <현재폴더>/ dir1/dir2
(async () => {
    try{
        await fs.mkdir("./dir1");
        await fs.mkdir("./dir1/dir2");
        console.log("폴더 생성 완료");
    } catch(err){
        console.log("폴더 생성 실패");
    }
})();

const deleteWork = async () => {
    try{
        await fs.rmdir("./dir1/dir2");
        await fs.rmdir("./dir1");
        console.log("폴더 삭제 완료");
    } catch(err){
        console.log("폴더 삭제 실패");
    }
};

setTimeout(() => {
    deleteWork();
}, 5000);

