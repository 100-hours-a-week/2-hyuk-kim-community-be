const ErrorCodes = Object.freeze({
    SUCCESS: {
        code: 200,
        message: {
            postCreated: "게시글 작성 성공",
            postsFetched: "게시글 목록 조회 성공",
            postDetailFetched: "게시글 상세보기 조회 성공",
            postUpdated: "게시글 수정 성공",
            postDeleted: "게시글 삭제 성공",
            commentCreated: "댓글 생성 성공",
            commentUpdated: "댓글 수정 성공",
            commentDeleted: "댓글 삭제 성공"
        },
        data: {}
    },
    CREATED: {
        code: 201,
        message: {
            postCreated: "게시글 작성 성공",
            commentCreated: "댓글 생성 성공"
        },
        data: {}
    },
    BAD_REQUEST: {
        code: 400,
        message: {
            mismatchUserId: "게시글 작성자와 다른 ID입니다.",
            mismatchCommentId: "댓글 작성자와 다른 ID입니다."
        },
        data: {}
    },
    NOT_FOUND: {
        code: 404,
        message: {
            boardNotFound: "ID에 해당하는 게시글이 존재하지 않습니다."
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
