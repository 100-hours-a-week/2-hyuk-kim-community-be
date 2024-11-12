const userService = require("../Service/UserService");
const apiResponse = require("../utils/apiResponse");

/*
Token 인증인가 구현 후 로그인, 회원가입 등의 반환값은 모두 id로 고정하기!
-> 회원가입도 해야되나?
 */

module.exports.login = async function (req, res) {
  try {
    const response = await userService.login(req);
    apiResponse.success(req, res, response);
  } catch (error) {
    apiResponse.error(req, res, error);
  }
};

module.exports.logout = function (req, res) {};

module.exports.signup = async function (req, res) {
  try {
    const response = await userService.signup(req);
    apiResponse.success(req, res, response);
  } catch (error) {
    apiResponse.error(req, res, error);
  }
};

module.exports.signout = async function (req, res) {
  const id = await userService.signout(req);
  res.status(200).json(id);
};

module.exports.getNickname = async function (req, res) {
  const nickname = await userService.getNickname(req);
  res.status(200).json(nickname);
};

module.exports.updateNickname = async function (req, res) {
  const id = await userService.updateNickname(req);
  res.status(200).json(id);
};

module.exports.updatePassword = async function (req, res) {
  const id = await userService.updatePassword(req);
  res.status(200).json(id);
};

module.exports = this;
