const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
};

const setAccessToken = (res, accessToken) => {
  console.log(`add cookie start!!`);
  res.cookie("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 60 * 1000, // 30분
  });
  console.log(`add cookie success!!`);
};

const setRefreshToken = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  });
};

const clearTokenCookies = (res) => {
  res.clearCookie("access_token", COOKIE_OPTIONS);
  res.clearCookie("refresh_token", COOKIE_OPTIONS);
};

// CommonJS 방식으로 모듈 내보내기
module.exports = {
  setAccessToken,
  setRefreshToken,
  clearTokenCookies
};
