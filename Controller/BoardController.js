const apiResponse = require("../common/responses/apiResponse");
const BoardSuccessCode = require("../common/codes/boardSuccessCode");
const boardService = require("../Service/BoardService");
const userService = require("../Service/UserService");

module.exports.getPostList = async (req, res, next) => {
  try {
    const board = await boardService.getPostList(req);
    // const result = await userService.setUserInfoInListByEmail(board);
    const successResponse = BoardSuccessCode.createPostFetched(board);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const result = await boardService.createPost(req);
    const successResponse = BoardSuccessCode.createPost(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.getPostByPostId = async (req, res, next) => {
  try {
    const board = await boardService.getPostByPostId(req);
    const successResponse = BoardSuccessCode.createPostDetailFetched(board);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

// 페이징 때문에 필요한 작업임!!
module.exports.getCommentListByPostId = async (req, res, next) => {
  try {
    const result = await boardService.getCommentListByPostId(req);
    const successResponse = BoardSuccessCode.createCommentFetched(result); // !!!
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.getPostEditByPostId = async (req, res, next) => {
  try {
    const result = await boardService.getPostEditByPostId(req);
    const successResponse = BoardSuccessCode.createPostDetailFetched(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePostByPostId = async (req, res, next) => {
  try {
    const result = await boardService.updatePostByPostId(req);
    const successResponse = BoardSuccessCode.createPostUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.deletePostByPostId = async (req, res, next) => {
  try {
    const result = await boardService.deletePostByPostId(req);
    const successResponse = BoardSuccessCode.createPostDeleted(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.createComment = async (req, res, next) => {
  try {
    const result = await boardService.createComment(req);
    const successResponse = BoardSuccessCode.createComment(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCommentByCommentId = async (req, res, next) => {
  try {
    const result = await boardService.updateCommentByCommentId(req);
    const successResponse = BoardSuccessCode.createCommentUpdated(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCommentByCommentId = async (req, res, next) => {
  try {
    const result = await boardService.deleteCommentByCommentId(req);
    const successResponse = BoardSuccessCode.createCommentDeleted(result);
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.likePost = async (req, res, next) => {
  try {
    await boardService.likePost(req);
    const successResponse = BoardSuccessCode.createLikePost();
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

module.exports.unLikePost = async (req, res, next) => {
  try {
    await boardService.unLikePost(req);
    const successResponse = BoardSuccessCode.createUnLikePost();
    apiResponse.success(req, res, successResponse);
  } catch (error) {
    next(error);
  }
};

