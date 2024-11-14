import jwt from "jsonwebtoken";

const JWT_SECRET = "이건못뚫겠지아무리너라도이건힘들거야푸하하풉킼킼";
const JWT_ACCESS_TOKEN_EXPIRATION = "30m"; // 30분
const JWT_REFRESH_TOKEN_EXPIRATION = "7d"; // 7일

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
