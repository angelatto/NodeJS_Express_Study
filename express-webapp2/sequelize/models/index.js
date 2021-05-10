'use strict'; // ES6 대로 작성했는지 엄격하게 문법을 검사하겠다는 의미. 생략 가능 

const fs = require('fs'); // fs 내장모듈 
const path = require('path'); // path 내장모듈 
const Sequelize = require('sequelize'); // 외부 모듈 
const basename = path.basename(__filename); // index.js
const env = process.env.NODE_ENV || 'development'; // 환경변수 디폴트는 개발모드 
const config = require(__dirname + '/../config/config.json')[env]; 
// config 설명 : 객체안의 env 속성을 가져오겠다. 모듈이 아닌것도 require로 가져올 수 있다. 
const db = {}; // 객체 선언 

// Sequelize 객체 생성 
let sequelize;
if (config.use_env_variable) { // 객체의 속성 "use_env_variable" 가 있다면 
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { // 없다면 
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname) // 배열을 리턴 
  .filter(file => {
    // 파일이 .으로 시작하거나, 파일명이 index.js이거나 또는 확장명이 .js이 아니면 ^^삭제,제외^^해서 새로운 배열 리턴 (원본은 그대로)
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // user.js, board.js  두번 반복, require안에 들어가려면 모듈 , 함수 
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // 디비 객체에 속성 추가
    // model.name : User, Board와 같은 클래스 이름 => 그래서 db.Board 와 db.User 사용가능했던 것이다. 
    // model은 model클래스이다. 
  });
/*
  db = {
    board: boardModel,
    user: userModel,
    sequelize: sequelize,
    Sequelize: Sequelize
  }

  Object.keys(db) == [Board, User];
  db[modelName] == boardModel or userModel 
  associate == 관계 설정이 있다면 관계 다 가져와 
*/
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { // 메소드가 있으면 
    db[modelName].associate(db); // 관계 다 가져와 
  }
});

db.sequelize = sequelize; // 위에서 선언한 변수, Sequelize 객체(db 연결 정보를 가짐)이다. 
db.Sequelize = Sequelize; // require('sequelize');

module.exports = db; 
/*
다른곳에서 require("db")하게 되면 DB를 얻게된다. 
*/