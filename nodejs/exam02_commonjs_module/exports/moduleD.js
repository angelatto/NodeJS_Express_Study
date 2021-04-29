
/*
exports는 module.exports를 참조한다. 
module.exports는 {}를 참조한다. 

exports => module.exports => {} 

주의)
만약 module.exports가 이미 선언되어있다면 
var4가 module.exports에 추가되지 않는다. 

exports.var4 = "value4";
이렇게 쓰고 싶으면 
모든 데이터와 함수를 이런식으로 선언해야 module.exports를 참조하게 된다. 
*/
exports.var4 = "value4";
exports.var5 = "value5";

exports.fun4 = () => {
  console.log("fun4() 실행");  
};

exports.fun5 = () => {
    console.log("fun5() 실행");  
};

