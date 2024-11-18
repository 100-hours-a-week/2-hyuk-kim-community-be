const userService = require("../Service/UserService");
const apiResponse = require("../common/responses/apiResponse");
const UserSuccessCode = require("../common/responses/UserSuccessCode");
const {generateRefreshToken, generateAccessToken} = require("../utils/provider/jwtProvider");
const {setAccessToken} = require("../utils/provider/cookieProvider");

/*
반복되는 코드가 많아 추상화로 줄일 수 있을 거 같은데, 그게 올바른 방식인지 모르겠네!
추가될만한 요소
1. Validation -> 근데 이거는 미들웨어에서 Joi라는 라이브러리 사용하면 충분히 추상화가 가능해보임!
2. Session Cookie -> 이게 좀 문제긴 하네 이거는 느낌이 좀 다를듯 -> 근데 그건 결국 로그인만 그런 건데
                  -> 검증은 미들웨어에서 진행해서 컨트롤러는 관련 없는듯!

=> 그간의 경험 내에서 추상화가 안 될만한 요소는 로그인 뿐인 거 같음
=> 2주차 과제 제출하고나서 한번 테스트 해보고 감 잡아보기!
*/

module.exports.login = async function (req, res, next) {
  try {
    const result = await userService.login(req);
    const successResponse = UserSuccessCode.createLoginSuccess(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = function (req, res, next) {};

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

module.exports.getNicknameByEmail = async function (req, res, next) {
  try {
    const result = await userService.getNicknameByEmail(req);
    const successResponse = UserSuccessCode.createUserFetched(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updateNicknameByEmail = async function (req, res, next) {
  try {
    const result = await userService.updateNicknameEmail(req);
    const successResponse = UserSuccessCode.createNicknameUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePasswordByEmail = async function (req, res, next) {
  try {
    const result = await userService.updatePasswordEmail(req);
    const successResponse = UserSuccessCode.createPasswordUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = this;
