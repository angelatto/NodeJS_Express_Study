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
const morgan = require("morgan"); // 외부 모듈 : 로그 관련 미들웨어 
const cookieParser = require("cookie-parser"); // 외부 모듈 : 쿠키 생성/제거/파싱하는 미들웨어 
const session = require("express-session");
const {sequelize} = require("./sequelize/models");
 // -> 기본적으로 index를 가져옴, 명시적 작성해도됨 
 // db에서 sequelize 구조분해할당으로 뽑아왔다. 

/* .env 파일을 읽어서 process.env에 추가 */
dotenv.config();

/* 
라우터 가져오기 
관례적으로 라우터의 파일 이름은 소문자, -를 이용함 
라우터 미들웨어
*/
const exam01Home = require("./routes/exam01-home"); // 라우터를 직접 모듈로 만들어줬으니 가능.
const exam02BindIfFor = require("./routes/exam02-bind-if-for"); 
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extends-block");
const exam05MiddleWare = require("./routes/exam05-middleware");
const exam06DataReceive = require("./routes/exam06-data-receive");
const exam07MultipartFormData = require("./routes/exam07-multipart-form-data")
const exam08Cookie = require("./routes/exam08-cookie");
const exam09Session = require("./routes/exam09-session");
const exam10Router = require("./routes/exam10-router");
const exam11Sequelize = require("./routes/exam11-sequelize");
const exam12Auth = require("./routes/exam12-auth");

// 애플리케이션 객체 생성 
const app = express();

// 템플릿 엔진으로 nunjucks를 설정 
app.set("view engine", "html");
// 뷰 파일의 폴더 설정 - watch는 html파일이 변경되면 새로 랜더링하겠다는 의미 
nunjucks.configure("views", {
    express: app,
    watch: true
});

// sequelize 데이터 연결과 동시에 -> 모델과 디비 테이블을 매핑(sync) 
// sync() 호출 시 모든 모델들의 init()함수 호출됨 
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패: " + err.message);
    });


// 정적 파일들을 제공하는 폴더 생성 
// app.use(express.static(__dirname + "/public")); 아래와 같은 코드임
const middlewareFunction = express.static(path.join(__dirname, "public"));
app.use(middlewareFunction);

// 모든 요청 경로에 실행되는 미들웨어 
app.use((req, res, next) => {
    console.log("미들웨어1 전처리");
    res.set("Cache-Control", 'no-store');
   // res.send("<html><body>Test123</body></html>")
    next();  // next 가 없으면 다음으로 실행 안됨., 그 스프링 필터처럼,, 
    console.log("미들웨어1 후처리");
});

app.use((req, res, next) => {
    console.log("미들웨어2 전처리");
    next();  
    console.log("미들웨어2 후처리");
}, (req, res, next) => {
    console.log("미들웨어3 전처리");
    next();  
    console.log("미들웨어3 후처리");
});

// 로그 출력을 위한 미들웨어 적용 
app.use(morgan("dev"));
// app.use(morgan("combined"));
// app.use(morgan(":method :url :status :res[content-length] :remote-addr"));

//  브라우저 캐싱 금지 미들웨어 적용 - 필터 마냥 순서 중요,
app.use((req, res, next) => {
    console.log("브라우저 캐싱 금지 미들웨어 실행")
    res.set("Cache-Control", 'no-store');
    next();  // next 가 없으면 다음으로 실행 안됨., 그 스프링 필터처럼,, 
});

// 요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서 
// req.body 객체로 만드는 미들웨어 적용 
app.use(express.urlencoded({extended:true})); // x-www-form-urlencoded : param1=value1&param2=value2
app.use(express.json()); // raw/json : {"param1":"value1", "param2":"value2"}

// 요청 HTTP 헤더에 있는 쿠키를 파싱해서 
// req.cookies 객체로 생성하는 미들웨어 적용 
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 설정 
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*30
    }
}));

/* 모든 템플릿 (view .html)에서 바인딩할 수 있는
   데이터를  설정하는 미들웨어 적용 */
app.use((req, res, next) => {
    res.locals.uid = req.session.uid || null;
    next();
});


// 요청 경로와 라우터 매핑 
app.use("/", exam01Home);
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);
app.use("/exam05", exam05MiddleWare);
app.use("/exam06", exam06DataReceive);
app.use("/exam07", exam07MultipartFormData);
app.use("/exam08", exam08Cookie);
app.use("/exam09", exam09Session);
app.use("/exam10", exam10Router);
app.use("/exam11", exam11Sequelize);
app.use("/exam12", exam12Auth);

// 위에서 요청 경로에 걸리지 않으면 아래 404 미들웨어로 들어감 
// 404 처리 미들웨어 - 주의) 에러 처리 미들웨어는 아님.
app.use((req, res, next) => {
    // 이렇게 보내주면 정상 응답 200으로 가기 때문에 좋지 않다. 
    // 그래서 응답 status를 지정 해줘야한다. 
    // res.status(404);
    // res.render("common/error.html");
    const error = new Error("잘못된 요청"); // 에러 객체 생성 
    error.status = 404;
    next(error); // 에러 처리 모듈로 넘겨준다. 
});

// 모든 에러 처리하는 미들웨어 
app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err: {};
    error.message = req.method + " " + req.url + " : " + err.message;
    error.status = err.status || 500;
    res.status(error.status); // status를 지정해주지 않으면 정상응답 상태로 들어감 
    res.render("common/error.html", {error});
});

// 애플리케이션 실행 
// app.set("port", 8080); // 전역적으로 저장 
// 환경변수 가져오는 방법 
app.set("port", process.env.PORT); // .env에서 설정하면 환경변수에 자동 추가 - 유지보수 편함 
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get('port')}`);
});