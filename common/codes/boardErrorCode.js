const { BadRequestError, NotFoundError } = require("./CustomError");

const ErrorMessages = {
  MISMATCH_USER_ID: "작성자가 아닙니다.",
  MISMATCH_COMMENT_ID: "댓글 작성자와 다른 ID입니다.",
  NOT_FOUND_BOARD: "ID에 해당하는 게시글이 존재하지 않습니다.",
  NOT_FOUND_COMMENT: "ID에 해당하는 게시글이 존재하지 않습니다.",
  INVALID_FORMAT: "입력 형식이 올바르지 않습니다.",
};

const BoardErrorCode = {
  createCommentNotFound: () => new NotFoundError(ErrorMessages.NOT_FOUND_COMMENT),
  createInvalidFormat: () => new BadRequestError(ErrorMessages.INVALID_FORMAT),
  createMismatchUser: () => new BadRequestError(ErrorMessages.MISMATCH_USER_ID),
  createBoardNotFound: () => new BadRequestError(ErrorMessages.NOT_FOUND_BOARD),
};

module.exports = BoardErrorCode;
