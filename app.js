const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./Route/UserRoute");
const boardRouter = require("./Route/BoardRoute");

const port = process.env.PORT || 3001;

// CORS 설정
const corsOptions = {
  origin: "http://localhost:3000", // 허용할 출처
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메서드
  credentials: true, // 인증 정보 허용
};

// CORS 미들웨어 사용
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key", // 세션 ID를 암호화할 비밀키
    resave: false, // 세션을 매 요청마다 다시 저장할지 여부
    saveUninitialized: true, // 세션에 값이 없더라도 세션을 저장할지 여부
    cookie: {
      httpOnly: true,
      secure: false,  // localhost는 false
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  }),
);

app.use(cookieParser());
app.use(loggingMiddleware);
app.use("/api", userRouter);
app.use("/api", boardRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
