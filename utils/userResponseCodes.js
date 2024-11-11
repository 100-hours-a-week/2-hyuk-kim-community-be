module.exports = {
  SUCCESS: {
    loginSuccess: { code: 200, message: "로그인 성공" },
    availableEmail: { code: 200, message: "사용 가능한 이메일입니다." },
    userFetched: { code: 200, message: "사용자 조회에 성공했습니다." },
    nicknameUpdated: { code: 200, message: "닉네임 수정 성공" },
    passwordUpdated: { code: 200, message: "비밀번호가 수정되었습니다." },
    accountDeleted: { code: 200, message: "회원 탈퇴가 완료되었습니다." },
  },
  CREATED: {
    userCreated: { code: 201, message: "회원가입 성공" },
  },
  BAD_REQUEST: {
    invalidCredentials: {
      code: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다.",
    },
    invalidFormat: { code: 400, message: "입력 형식이 올바르지 않습니다." },
    userNotFound: {
      code: 400,
      message: "ID에 해당하는 사용자가 존재하지 않습니다.",
    },
    emailNotFound: {
      code: 400,
      message: "ID에 해당하는 이메일이 존재하지 않습니다.",
    },
    invalidUserId: {
      code: 400,
      message: "ID에 해당하는 사용자가 존재하지 않습니다.",
    },
  },
  NOT_FOUND: {
    userNotFound: {
      code: 404,
      message: "ID에 해당하는 사용자가 존재하지 않습니다.",
    },
  },
  CONFLICT: {
    emailExists: { code: 409, message: "이미 존재하는 이메일입니다." },
  },
  SERVER_ERROR: {
    unexpectedError: {
      code: 500,
      message:
        "서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    },
  },
};

module.exports.createResponse = (code, data) => {
  return {
    code: code.code,
    message: code.message,
    data: data,
  };
};
