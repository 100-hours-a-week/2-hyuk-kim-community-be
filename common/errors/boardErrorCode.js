const {
  BadRequestError,
  NotFoundError,
} = require('./CustomError');

const ErrorMessages = {
  MISMATCH_USER_ID: "게시글 작성자와 다른 ID입니다.",
  MISMATCH_COMMENT_ID: "댓글 작성자와 다른 ID입니다.",
  BOARD_NOT_FOUND: "ID에 해당하는 게시글이 존재하지 않습니다."
};

const BoardErrorCode = {
  createMismatchUserId: () => new BadRequestError(ErrorMessages.MISMATCH_USER_ID),
  createMismatchCommentId: () => new BadRequestError(ErrorMessages.MISMATCH_COMMENT_ID),
  createBoardNotFound: () => new NotFoundError(ErrorMessages.BOARD_NOT_FOUND)
};

module.exports = BoardErrorCode;