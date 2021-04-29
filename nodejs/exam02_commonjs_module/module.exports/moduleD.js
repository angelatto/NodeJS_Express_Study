const var4 = "value4";
const var5 = "value5";

const fun4 = () => {
  console.log("fun4() 실행");  
};

const fun5 = () => {
    console.log("fun5() 실행");  
};

// 데이터 뿐만 아니라 함수도 포함한 모듈 
module.exports = {
    var4,
    var5,
    fun4,
    fun5
};

// 최상위로 실행되었느냐? 즉, node 명령어로 실행이 되었느냐? 
if(require.main === module){
  console.log("이것은 테스트 입니다. ---------------");
  fun4();
  fun5();
}
console.log("ModuleD 실행");
