console.log("hello node.js");

function fun1() {
    console.log("fun1---");
    fun2();
    
}

function fun2() {
    console.log("fun2---");
}

fun1();