const ErrorCodes = Object.freeze({
  POST_CREATED: { code: 200, message: "게시글 작성 성공" },
  POSTS_FETCHED: { code: 200, message: "게시글 목록 조회 성공" },
  POST_DETAIL_FETCHED: { code: 200, message: "게시글 상세보기 조회 성공" },
  POST_UPDATED: { code: 200, message: "게시글 수정 성공" },
  POST_DELETED: { code: 200, message: "게시글 삭제 성공" },
  COMMENT_CREATED: { code: 200, message: "댓글 생성 성공" },
  COMMENT_UPDATED: { code: 200, message: "댓글 수정 성공" },
  COMMENT_DELETED: { code: 200, message: "댓글 삭제 성공" },

  CREATED_POST: { code: 201, message: "게시글 작성 성공" },
  CREATED_COMMENT: { code: 201, message: "댓글 생성 성공" },

  MISMATCH_USER_ID: { code: 400, message: "게시글 작성자와 다른 ID입니다." },
  MISMATCH_COMMENT_ID: { code: 400, message: "댓글 작성자와 다른 ID입니다." },

  BOARD_NOT_FOUND: {
    code: 404,
    message: "ID에 해당하는 게시글이 존재하지 않습니다.",
  },

  UNEXPECTED_ERROR: {
    code: 500,
    message:
      "서버에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
});

module.exports = ErrorCodes;
