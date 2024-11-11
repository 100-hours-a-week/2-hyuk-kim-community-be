const ErrorCodes = Object.freeze({
    SUCCESS: {
        code: 200,
        message: {
            loginSuccess: "로그인 성공",
            availableEmail: "사용 가능한 이메일입니다.",
            userFetched: "사용자 조회에 성공했습니다.",
            nicknameUpdated: "닉네임 수정 성공",
            passwordUpdated: "비밀번호가 수정되었습니다.",
            accountDeleted: "회원 탈퇴가 완료되었습니다.",
        },
        data: {}
    },
    CREATED: {
        code: 201,
        message: {
            userCreated: "회원가입 성공",
        },
        data: {}
    },
    BAD_REQUEST: {
        code: 400,
        message: {
            invalidCredentials: "아이디 또는 비밀번호가 일치하지 않습니다.",
            invalidFormat: "입력 형식이 올바르지 않습니다.",
            userNotFound: "ID에 해당하는 사용자가 존재하지 않습니다.",
            emailNotFound: "ID에 해당하는 이메일이 존재하지 않습니다.",
            invalidUserId: "ID에 해당하는 사용자가 존재하지 않습니다.",
        },
        data: {}
    },
    NOT_FOUND: {
        code: 404,
        message: {
            userNotFound: "ID에 해당하는 사용자가 존재하지 않습니다."
        },
        data: {}
    },
    CONFLICT: {
        code: 409,
        message: {
            emailExists: "이미 존재하는 이메일입니다."
        },
        data: {}
    },
    SERVER_ERROR: {
        code: 500,
        message: {
            unexpectedError: "서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        },
        data: {}
    },
});

module.exports = ErrorCodes;
