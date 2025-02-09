const config = require("./config/app.config"); // 이 변수를 통해 설정 관련 상수를 한 곳에서 관리합니다.
const port = config.PORT;

// CORS 설정
const corsOptions = {
    origin: config.ALLOWED_ORIGINS, // [jeff] 환경 변수를 활용하여 허용할 Origin 관리
    methods: config.ALLOWED_METHODS, // [jeff] 허용할 HTTP 메서드 정의
    credentials: config.CREDENTIALS_ALLOWED, // [jeff] 일관성을 위해 이 값까지 몽창 config.js 에서 중앙관리
};
const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./Route/UserRoute");
const boardRouter = require("./Route/BoardRoute");
const imageRouter = require("./Route/ImageRoute");

// CORS 미들웨어 사용
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SESSION_SECRET,
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

app.use(express.json({ limit: '15mb' }));
app.use(loggingMiddleware);
app.use("/api", imageRouter);
app.use("/api", boardRouter);
app.use("/api", userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
