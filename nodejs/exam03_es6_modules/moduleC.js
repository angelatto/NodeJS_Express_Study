const var2 = "value2";
const var3 = "value3";

const fun2 = () => {
  console.log("fun2() 실행");  
};

const fun3 = () => {
    console.log("fun3() 실행");  
};

// 데이터 뿐만 아니라 함수도 포함한 모듈 
export default {
    var2,
    var3,
    fun2,
    fun3
};
