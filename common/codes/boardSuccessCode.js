const { OK, Created } = require("../responses/CustomSuccess");

const SuccessMessages = {
  POST_CREATED: "게시글 작성 성공",
  POSTS_FETCHED: "게시글 목록 조회 성공",
  POST_DETAIL_FETCHED: "게시글 상세보기 조회 성공",
  POST_UPDATED: "게시글 수정 성공",
  POST_DELETED: "게시글 삭제 성공",
  COMMENT_CREATED: "댓글 생성 성공",
  COMMENT_UPDATED: "댓글 수정 성공",
  COMMENT_DELETED: "댓글 삭제 성공",
};

const BoardSuccessCode = {
  // 200 응답
  createPostFetched: (data) => new OK(SuccessMessages.POSTS_FETCHED, data),
  createPostDetailFetched: (data) => new OK(SuccessMessages.POST_DETAIL_FETCHED, data),
  createPostUpdated: (data) => new OK(SuccessMessages.POST_UPDATED, data),
  createPostDeleted: (data) => new OK(SuccessMessages.POST_DELETED, data),
  createCommentUpdated: (data) => new OK(SuccessMessages.COMMENT_UPDATED, data),
  createCommentDeleted: (data) => new OK(SuccessMessages.COMMENT_DELETED, data),

  // 201 응답
  createPost: (data) => new Created(SuccessMessages.POST_CREATED, data),
  createComment: (data) => new Created(SuccessMessages.COMMENT_CREATED, data),
};

module.exports = BoardSuccessCode;
