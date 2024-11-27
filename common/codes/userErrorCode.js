const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require("../responses/CustomError");

// [jeff] 비슷한 도메인끼리 혹은 같은 접두어끼리 뭉쳐놓는게 좋습니다.
// 그래야 중복 생성을 하지 않습니다.
const ErrorMessages = {
  NOT_LOGGED_IN: "로그인이 필요한 서비스입니다.",
  DELETED_USER: "회원 탈퇴한 유저입니다.",
  UNAUTHORIZED_USER_ACCESS: "해당 사용자의 정보에 접근할 권한이 없습니다.",

  // [jeff] 상황을 접두어로 두는것을 개인적으로는 선호합니다.
  // 그래야 개발 급하게 하더라도 중복 생성이 최소화 되더라구요.
  INVALID_ACCESS: "잘못된 접근입니다.",
  INVALID_CREDENTIALS: "아이디 또는 비밀번호가 일치하지 않습니다.",
  INVALID_AUTH: "사용자 인증에 실패했습니다.",
  INVALID_FORMAT: "입력 형식이 올바르지 않습니다.",
  INVALID_USER_ID: "ID에 해당하는 사용자가 존재하지 않습니다.",
  EXPIRED_SESSION: "세션이 만료되었습니다. 다시 로그인해주세요.",

  // [jeff] "상황"을 접두어로 쓰는게 좋습니다. 그러면 뭉치기가 쉬워요
  NOT_FOUND_USER: "ID에 해당하는 사용자가 존재하지 않습니다.",
  NOT_FOUND_EMAIL: "ID에 해당하는 이메일이 존재하지 않습니다.",
  // USER_NOT_FOUND: "ID에 해당하는 사용자가 존재하지 않습니다.",
  // EMAIL_NOT_FOUND: "ID에 해당하는 이메일이 존재하지 않습니다.",

  // [jeff] 존재 여부 확인할 때는 동사와 함께 상황을 설명하는게 좋습니다.
  IS_EXIST_EMAIL: "이미 존재하는 이메일입니다.", // ALREADY 든 IS_EXIST 든 상황을 설명해주는게 핵심입니다.
  // EMAIL_EXISTS: "이미 존재하는 이메일입니다.",
  UNEXPECTED_ERROR: "서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};


// [jeff] 에러코드, 성공코드는 가급적이면 주석으로 상황 설명하는게 좋습니다.
// 그래야 재사용성이 높아집니다.
// 바쁠때 그냥 빨리빨리 짜다보면 함수별로 어떤 상황에서 쓰이는지 제대로 확인안하고 함수 막 생성하는 경우가 생기는데요
// 이러면 리팩토링 비용이 더들어갑니다.
const UserErrorCode = {
  createInvalidAuth: () => new UnauthorizedError(ErrorMessages.INVALID_AUTH),
  createDeleteUser: () => new BadRequestError(ErrorMessages.DELETED_USER),
  createExpiredSession: () => new UnauthorizedError(ErrorMessages.EXPIRED_SESSION),
  createInvalidCredentials: () => new BadRequestError(ErrorMessages.INVALID_CREDENTIALS),
  notLoggedIn: () => new UnauthorizedError(ErrorMessages.NOT_LOGGED_IN),
  createInvalidFormat: () => new BadRequestError(ErrorMessages.INVALID_FORMAT),
  createUserNotFound: () => new NotFoundError(ErrorMessages.NOT_FOUND_USER),
  createEmailNotFound: () => new NotFoundError(ErrorMessages.NOT_FOUND_EMAIL),
  createEmailExists: () => new ConflictError(ErrorMessages.IS_EXIST_EMAIL),
  createUnexpectedError: () => new InternalServerError(ErrorMessages.UNEXPECTED_ERROR),
};

module.exports = UserErrorCode;
