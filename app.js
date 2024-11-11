const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const app = express();
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
// app.use(errorMiddleware);

app.use("/api", userRouter);
app.use("/api", boardRouter);

// app.use(myError);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
