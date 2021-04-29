const fs = require("fs").promises;

// 폴더인지 파일인지 확인 
(async () => {
    // 폴더인지 파일인지 확인 
    const stat = await fs.stat("./dirinfo.js");
    console.log(stat.isFile()); 
    console.log(stat.isDirectory());

    // 폴더 내용 얻기 
    const files = await fs.readdir(__dirname); // 폴더안에 있는 파일들의 이름 , 배열리턴 
    for(let file of files){ // ES6문법) 배열일때 of 연산자 사용할 수 있다. 
        console.log(file);
    }   
 
    // 파일 삭제 
    await fs.unlink("./test.js");
})();