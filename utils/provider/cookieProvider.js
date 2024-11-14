const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
};

export const setAccessToken = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 60 * 1000,
  });
};

export const setRefreshToken = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearTokenCookies = (res) => {
  res.clearCookie("accesstoken", COOKIE_OPTIONS);
  res.clearCookie("refreshtoken", COOKIE_OPTIONS);
};
