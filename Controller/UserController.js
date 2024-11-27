const apiResponse = require("../common/responses/apiResponse");
const UserSuccessCode = require("../common/codes/userSuccessCode");
const userService = require("../Service/UserService");
const { v4: uuidv4 } = require("uuid");
const {
  // [jeff] 안쓰는 코드 삭제!
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/provider/jwtProvider");

// [jeff] 선언만하고 사용하고 있지는 않는 상태인데 이런 코드는 삭제하는게 좋습니다.
// 추가적으로 cookie provider 를 굳이 두개로 나눈 이유가 있나요?
// 특정 request 에 한해서 쿠키 닦아내야 하거나 바꿔줘야 하는 상황이면 middleware 통해서 관리하는게 좋아보입니다.
const { setAccessToken } = require("../utils/provider/cookieProvider");

module.exports.login = async function (req, res, next) {
  try {
    const userId = await userService.login(req);
    req.session.userId = userId; // localhost 프론트로 테스트시 주석처리!!
    const sessionId = req.session.id;
    const successResponse = UserSuccessCode.createLoginSuccess({ userId, sessionId});
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

module.exports.getNicknameById = async function (req, res, next) {
  try {
    const result = await userService.getNicknameById(req);
    const successResponse = UserSuccessCode.createUserFetched(result);
    console.log(`result: ${JSON.stringify(result)}`);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updateNicknameById = async function (req, res, next) {
  try {
    const result = await userService.updateNicknameById(req);
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

// [jeff] 전부 export 했는데 this 를 export 한 이유는?
module.exports = this;
