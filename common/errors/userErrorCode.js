const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require('./CustomError');

const ErrorMessages = {
  NOT_LOGGED_IN: "로그인이 필요한 서비스입니다.",
  INVALID_ACCESS: "잘못된 접근입니다.",
  UNAUTHORIZED_USER_ACCESS: "해당 사용자의 정보에 접근할 권한이 없습니다.",
  INVALID_CREDENTIALS: "아이디 또는 비밀번호가 일치하지 않습니다.",
  INVALID_FORMAT: "입력 형식이 올바르지 않습니다.",
  USER_NOT_FOUND: "ID에 해당하는 사용자가 존재하지 않습니다.",
  EMAIL_NOT_FOUND: "ID에 해당하는 이메일이 존재하지 않습니다.",
  INVALID_USER_ID: "ID에 해당하는 사용자가 존재하지 않습니다.",
  EMAIL_EXISTS: "이미 존재하는 이메일입니다.",
  UNEXPECTED_ERROR: "서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

const UserErrorCode = {
  createInvalidCredentials: () => new BadRequestError(ErrorMessages.INVALID_CREDENTIALS),
  notLoggedIn: () => new UnauthorizedError(ErrorMessages.NOT_LOGGED_IN),
  createInvalidFormat: () => new BadRequestError(ErrorMessages.INVALID_FORMAT),
  createUserNotFound: () => new NotFoundError(ErrorMessages.USER_NOT_FOUND),
  createEmailNotFound: () => new NotFoundError(ErrorMessages.EMAIL_NOT_FOUND),
  createEmailExists: () => new ConflictError(ErrorMessages.EMAIL_EXISTS),
  createUnexpectedError: () => new InternalServerError(ErrorMessages.UNEXPECTED_ERROR),
};

module.exports = UserErrorCode;