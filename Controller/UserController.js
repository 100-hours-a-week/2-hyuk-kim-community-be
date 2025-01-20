const apiResponse = require("../common/responses/apiResponse");
const UserSuccessCode = require("../common/codes/userSuccessCode");
const userService = require("../Service/UserService");
const { v4: uuidv4 } = require("uuid");

module.exports.login = async function (req, res, next) {
  try {
    const data = await userService.login(req);
    req.session.userId = data.userId; // localhost 프론트로 테스트시 주석처리!!
    const sessionId = req.session.id;
    const successResponse = UserSuccessCode.createLoginSuccess({ ...data, sessionId});
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = function (req, res, next) {
  req.session.destroy();
  res.clearCookie('connect.sid');
  const successResponse = UserSuccessCode.createLogoutSuccess();
  apiResponse.success(req, res, successResponse );
};

module.exports.signup = async function (req, res, next) {
  try {
    const result = await userService.signup(req);
    const successResponse = UserSuccessCode.createUserCreated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.signout = async function (req, res, next) {
  try {
    const result = await userService.signout(req);
    const successResponse = UserSuccessCode.createAccountDeleted(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.getProfile = async function (req, res, next) {
  try {
    const result = await userService.getProfile(req);
    const successResponse = UserSuccessCode.createUserFetched(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updateProfile = async function (req, res, next) {
  try {
    const result = await userService.updateProfile(req);
    const successResponse = UserSuccessCode.createNicknameUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePasswordById = async function (req, res, next) {
  try {
    const result = await userService.updatePasswordById(req);
    const successResponse = UserSuccessCode.createPasswordUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};