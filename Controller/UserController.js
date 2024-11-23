const apiResponse = require("../common/responses/apiResponse");
const UserSuccessCode = require("../common/responses/userSuccessCode");
const userService = require("../Service/UserService");
const { v4: uuidv4 } = require("uuid");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/provider/jwtProvider");
const { setAccessToken } = require("../utils/provider/cookieProvider");

/*
반복되는 코드가 많아 추상화할 수 있을 거 같은데, 그게 긍정적인 방식인지 모르겠네!
추가될만한 요소
1. Validation -> 근데 이거는 미들웨어에서 Joi라는 라이브러리 사용하면 충분히 추상화가 가능해보임!
    -> 어차피 이건 Service 아님 미들웨어에서 하는 게 적절하겠네!
2. Session Cookie -> 이게 좀 문제긴 하네 이거는 느낌이 좀 다를듯 -> 근데 그건 결국 로그인만 그런 건데
                  -> 검증은 미들웨어에서 진행해서 컨트롤러는 관련 없는듯!

=> 현재로서는 로그인시 Session 생성하는 거 제외하고 추상화가 가능한 것으로 보임 !

=> 그간의 경험 내에서 추상화가 안 될만한 요소는 로그인 뿐인 거 같음
=> 2주차 과제 제출하고나서 한번 테스트 해보고 감 잡아보기!
*/

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

module.exports = this;
