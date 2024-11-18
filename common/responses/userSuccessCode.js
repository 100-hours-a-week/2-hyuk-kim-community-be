const { OK, Created } = require("./CustomSuccess");

const SuccessMessages = {
  LOGIN_SUCCESS: "로그인 성공",
  AVAILABLE_EMAIL: "사용 가능한 이메일입니다.",
  USER_FETCHED: "사용자 조회에 성공했습니다.",
  NICKNAME_UPDATED: "닉네임 수정 성공",
  PASSWORD_UPDATED: "비밀번호가 수정되었습니다.",
  ACCOUNT_DELETED: "회원 탈퇴가 완료되었습니다.",
  USER_CREATED: "회원가입 성공",
};

const UserSuccessCode = {
  createLoginSuccess: (data) => new OK(SuccessMessages.LOGIN_SUCCESS, data),
  createAvailableEmail: (data) => new OK(SuccessMessages.AVAILABLE_EMAIL, data),
  createUserFetched: (data) => new OK(SuccessMessages.USER_FETCHED, data),
  createNicknameUpdated: (data) => new OK(SuccessMessages.NICKNAME_UPDATED, data),
  createPasswordUpdated: (data) => new OK(SuccessMessages.PASSWORD_UPDATED, data),
  createAccountDeleted: (data) => new OK(SuccessMessages.ACCOUNT_DELETED, data),
  createUserCreated: (data) => new Created(SuccessMessages.USER_CREATED, data),
};

module.exports = UserSuccessCode;
