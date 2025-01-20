const { OK, Created } = require("../responses/CustomSuccess");

const SuccessMessages = {
  LOGIN: "성공적으로 로그인했습니다",
  LOGOUT: "성공적으로 로그아웃했습니다",
  CREATE_USER: "성공적으로 회원가입을 완료했습니다",

  VERIFY_EMAIL: "확인 완료: 사용 가능한 이메일입니다",
  FETCH_USER: "성공적으로 사용자를 조회했습니다",

  UPDATE_NICKNAME: "성공적으로 닉네임을 수정했습니다",
  UPDATE_PASSWORD: "성공적으로 비밀번호를 수정했습니다",

  DELETE_ACCOUNT: "성공적으로 회원 탈퇴를 완료했습니다",
};

const UserSuccessCode = {
  createLoginSuccess: (data) => new OK(SuccessMessages.LOGIN, data),
  createLogoutSuccess: () => new OK(SuccessMessages.LOGOUT),
  createEmailVerified: (data) => new OK(SuccessMessages.VERIFY_EMAIL, data),
  createUserFetched: (data) => new OK(SuccessMessages.FETCH_USER, data),
  createNicknameUpdated: (data) => new OK(SuccessMessages.UPDATE_NICKNAME, data),
  createPasswordUpdated: (data) => new OK(SuccessMessages.UPDATE_PASSWORD, data),
  createAccountDeleted: (data) => new OK(SuccessMessages.DELETE_ACCOUNT, data),
  createUserCreated: (data) => new Created(SuccessMessages.CREATE_USER, data),
};

module.exports = UserSuccessCode;