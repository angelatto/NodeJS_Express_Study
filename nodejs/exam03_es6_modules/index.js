import moduleA from "./moduleA.js";

console.log(moduleA.name);
console.log(moduleA.age);

import fun1 from "./moduleB.js";
fun1();

import moduleC from "./moduleC.js";
console.log(moduleC.var2);
console.log(moduleC.var3);
moduleC.fun2();
moduleC.fun3();

// export default로 선언하지 않은 것은 구조분해할당을 이용해야 한다. 
import {var4, var5, fun4, fun5} from "./moduleD.js";
console.log(var4);
console.log(var5);
fun4();
fun5();

/* 이렇게 구조분해할당보다 export default를 먼저 선언해줘야 한다. */
import moduleE, {var6, var7} from "./moduleE.js";
//import {var6, var7}, moduleE from "./moduleE.js";
moduleE.fun6();
moduleE.fun7();
console.log(var6);
console.log(var7);