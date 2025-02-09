require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

module.exports = {
    PORT: process.env.PORT || 3001,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:3000", "http://community-front-deploy.s3-website.ap-northeast-2.amazonaws.com"], // CORS 허용 도메인
    ALLOWED_METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용 HTTP 메서드
    CREDENTIALS_ALLOWED: true, // CORS 인증 허용
    SESSION_SECRET: process.env.SESSION_SECRET || "your-secret-key", // 세션 암호화 키
    COOKIE_SECURE: process.env.COOKIE_SECURE === "true", // HTTPS 사용 시 true
    COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || "lax", // CSRF 방지
    COOKIE_MAX_AGE: 24 * 60 * 60 * 1000, // cookie expire 24h
};