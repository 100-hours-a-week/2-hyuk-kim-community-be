
// [jeff] config.js 로 이관했습니다. 사유는 아래 적시 했어요
// const dotenv = require('dotenv');  -> config.js 로 이관
// dotenv.config({path: `.env.${process.env.NODE_ENV}`});

// [jeff]
// config 폴더를 쓰시는 걸로 봤을 때 app server 의 config 값도
// config.js 파일로 환경 변수 정리 한 곳에 모아서 관리 할 수 있습니다. (이건 스타일 차이인데요..  편한 방법으로 진행하시면 됩니다.)
// const port = process.env.PORT || 3001;
const config = require("./config/config"); // 이 변수를 통해 설정 관련 상수를 한 곳에서 관리합니다.
const port = config.PORT;

// CORS 설정
const corsOptions = {
    origin: config.ALLOWED_ORIGINS, // [jeff] 환경 변수를 활용하여 허용할 Origin 관리
    methods: config.ALLOWED_METHODS, // [jeff] 허용할 HTTP 메서드 정의
    credentials: config.CREDENTIALS_ALLOWED, // [jeff] 일관성을 위해 이 값까지 몽창 config.js 에서 중앙관리
};

const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./Route/UserRoute");
const boardRouter = require("./Route/BoardRoute");

// CORS 미들웨어 사용
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SESSION_SECRET, // 세션 ID를 암호화할 비밀키
    resave: false, // 세션을 매 요청마다 다시 저장할지 여부
    saveUninitialized: true, // 세션에 값이 없더라도 세션을 저장할지 여부
    cookie: {
      httpOnly: true, // XSS 방지를 위해 가급적 true로!
      secure: config.COOKIE_SECURE,  // localhost는 false
      sameSite: config.COOKIE_SAMESITE,
      maxAge: config.COOKIE_MAX_AGE
    }
  }),
);

// [jeff] cookie-parser 는 이제 express에 built-in 됐습니다.
// 관련자료: https://expressjs.com/en/resources/middleware/session.html ->"session(options)" 단락 notice 참조
// app.use(cookieParser());

// [jeff] 미들웨어는 순서가 바뀌면 안되는 경우가 많습니다. 중요한 미들웨어인 경우 순서가 바뀌지 않도록 주석으로 메모를 꼭 해두시는게 좋습니다.
app.use(loggingMiddleware);
app.use("/api", boardRouter);
app.use("/api", userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
