/**
 * [jeff] dotenv 변수를 재사용할 일이 없기 때문에 한큐에 가도 됩니다.
 */

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

// [jeff] 설정 값에는 주석을 꼭 잘 달아줘야 합니다.
// 아래처럼 리터럴 객체로 바로 쏴도 되고 변수별로 예쁘게 해도 되고.. 콜백으로 넘겨도 되고 뭐.. 등등 방법은 자유!
// 유지보수 할 때 시간 뺏기기 딱 좋은 포인트임..
module.exports = {
    PORT: process.env.PORT || 3001, //  (예시 주석) 운영환경 인바운드 포트 변경은 mona 에게 문의  (jeff, 2024/11/27) -> 이런식으로 메모 달아놓으면 좋음
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:3000", "http://3.39.229.64:3000"], // CORS 허용 도메인
    ALLOWED_METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용 HTTP 메서드
    CREDENTIALS_ALLOWED: true, // CORS 인증 허용
    SESSION_SECRET: process.env.SESSION_SECRET || "your-secret-key", // 세션 암호화 키
    COOKIE_SECURE: process.env.COOKIE_SECURE === "true", // HTTPS 사용 시 true
    COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || "lax", // CSRF 방지
    COOKIE_MAX_AGE: 24 * 60 * 60 * 1000, // cookie expire 24h
};