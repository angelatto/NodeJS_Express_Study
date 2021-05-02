/*
public 폴더는 정적 파일들 위치 
넌적스가 관여하지 않는다. 
*/
console.log("앱 실행");

/* 모듈 가져오기 */
const express = require("express"); // 외부 모듈, npm install
const path = require("path"); // NodeJS Core Library에 있는 내장 모듈 
const nunjucks = require("nunjucks"); // 외부 모듈 , npm install
const dotenv = require("dotenv"); // 외부 모듈 : 프로젝트 내에서 .env에 지정하면 환경변수에 추가해줌

/* .env 파일을 읽어서 process.env에 추가 */
dotenv.config();

/* 
라우터 가져오기 
관례적으로 라우터의 파일 이름은 소문자, -를 이용함 
*/
const exam01Home = require("./routes/exam01-home"); // 라우터를 직접 모듈로 만들어줬으니 가능.
const exam02BindIfFor = require("./routes/exam02-bind-if-for"); 
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extends-block");

// 애플리케이션 객체 생성 
const app = express();

// 템플릿 엔진으로 nunjucks를 설정 
app.set("view engine", "html");
// 뷰 파일의 폴더 설정 - watch는 html파일이 변경되면 새로 랜더링하겠다는 의미 
nunjucks.configure("views", {
    express: app,
    watch: true
});

// 정적 파일들을 제공하는 폴더 생성 
// app.use(express.static(__dirname + "/public")); 아래와 같은 코드임
app.use(express.static(path.join(__dirname, "/public")));

// 요청 경로와 라우터 매핑 
app.use("/", exam01Home);
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);

// 애플리케이션 실행 
// app.set("port", 8080); // 전역적으로 저장 
// 환경변수 가져오는 방법 
app.set("port", process.env.PORT); // .env에서 설정하면 환경변수에 자동 추가 - 유지보수 편함 
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get('port')}`);
});