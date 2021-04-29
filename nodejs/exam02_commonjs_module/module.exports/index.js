const moduleA = require("./moduleA");
console.log(moduleA.name);
console.log(moduleA.age);

const fun1 = require("./moduleB");
fun1();

const moduleC = require("./moduleC");
console.log(moduleC.var2);
console.log(moduleC.var3);
console.log(moduleC.fun2());
console.log(moduleC.fun3());

// 구조 분해 할당을 이용해서 필요한 것만 추출 
const {var5, fun5} = require("./moduleD");
console.log(var5);
fun5();
