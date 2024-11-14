const userService = require("../Service/UserService");
const apiResponse = require("../utils/apiResponse");

module.exports.login = async function (req, res) {
  try {
    const response = await userService.login(req);
    apiResponse.success(req, res, response);
  } catch (error) {
    next(error);
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
  try {
    const id = await userService.signout(req);
    res.status(200).json(id);
  } catch (error) {
    apiResponse.error(req, res, error);
  }
};

module.exports.getNicknameByEmail = async function (req, res) {
  try {
    const nickname = await userService.getNicknameByEmail(req);
    res.status(200).json(nickname);
  } catch (error) {
    apiResponse.error(req, res, error);
  }
};

module.exports.updateNicknameByEmail = async function (req, res) {
  const id = await userService.updateNicknameEmail(req);
  res.status(200).json(id);
};

module.exports.updatePasswordByEmail = async function (req, res) {
  const id = await userService.updatePasswordEmail(req);
  res.status(200).json(id);
};

module.exports = this;
