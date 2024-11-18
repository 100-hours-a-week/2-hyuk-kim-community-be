const jwt = require("jsonwebtoken");

const JWT_SECRET = "이건못뚫겠지아무리너라도이건힘들거야푸하하풉킼킼";
const JWT_ACCESS_TOKEN_EXPIRATION = "30m"; // 30분
const JWT_REFRESH_TOKEN_EXPIRATION = "7d"; // 7일

const generateAccessToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

// CommonJS 방식으로 모듈 내보내기
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyAccessToken,
  verifyRefreshToken,
};
