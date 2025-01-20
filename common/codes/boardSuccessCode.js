const { OK, Created } = require("../responses/CustomSuccess");

const SuccessMessages = {
  CREATED_POST: "게시글 작성 성공",
  FETCHED_POSTS: "게시글 목록 조회 성공",
  FETCHED_COMMENTS: "댓글 목록 조회 성공",
  FETCHED_POST_DETAIL: "게시글 상세보기 조회 성공",
  UPDATED_POST: "게시글 수정 성공",
  DELETED_POST: "게시글 삭제 성공",

  CREATED_COMMENT: "댓글 생성 성공",
  UPDATED_COMMENT: "댓글 수정 성공",
  DELETED_COMMENT: "댓글 삭제 성공",

  LIKE_POST: "좋아요 성공",
  UNLIKE_POST: "좋아요 취소 성공",
};

const BoardSuccessCode = {
  // 200 응답
  createPostFetched: (data) => new OK(SuccessMessages.FETCHED_POSTS, data),
  createCommentFetched: (data) => new OK(SuccessMessages.FETCHED_POSTS, data),
  createPostDetailFetched: (data) => new OK(SuccessMessages.FETCHED_POST_DETAIL, data),
  createPostUpdated: (data) => new OK(SuccessMessages.UPDATED_POST, data),
  createPostDeleted: (data) => new OK(SuccessMessages.DELETED_POST, data),
  createCommentUpdated: (data) => new OK(SuccessMessages.UPDATED_COMMENT, data),
  createCommentDeleted: (data) => new OK(SuccessMessages.DELETED_COMMENT, data),

  // 201 응답
  createPost: (data) => new Created(SuccessMessages.CREATED_POST, data),
  createComment: (data) => new Created(SuccessMessages.CREATED_COMMENT, data),
  createLikePost: () => new Created(SuccessMessages.LIKE_POST),
  createUnLikePost: () => new Created(SuccessMessages.UNLIKE_POST),
};

module.exports = BoardSuccessCode;
