function setUserId(userId){
    globalThis.userId = userId;
}

global.fun1 = () => {
    console.log("global.fun1() 실행");
}

module.exports = {
    setUserId
};