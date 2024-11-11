const boardService = require("../Service/BoardService");
const userService = require("../Service/UserService");

module.exports.getPostList = async (req, res) => {
  const board = await boardService.getPostList(req);
  const result = await userService.addUserInfoInList(board);
  console.log("result : " + JSON.stringify(result));
  return res.status(200).json(result);
};

module.exports.createPost = async (req, res) => {
  return res.status(200).json(await boardService.createPost(req));
};

module.exports.getPostByPostId = async (req, res) => {
  const board = await boardService.getPostByPostId(req);
  const result = await userService.addUserInfo(board);
  console.log("result : " + JSON.stringify(result));
  return res.status(200).json(result);
};

module.exports.getPostEditByPostId = async (req, res) => {
  console.log("get post start!!: ", req.params.postId);
  return res.status(200).json(await boardService.getPostEditByPostId(req));
};

module.exports.patchPostViews = async (req, res) => {
  console.log("patch post start!!: ", req.params.postId);
  return res.status(200).json(await boardService.patchPostViews(req));
};

module.exports.updatePostByPostId = async (req, res) => {
  console.log("update post start!!: ", req.params.postId);
  return res.status(200).json(await boardService.updatePostByPostId(req));
};

module.exports.deletePostByPostId = async (req, res) => {
  console.log("delete post start!!: ", req.params.postId);
  return res.status(200).json(await boardService.deletePostByPostId(req));
};

module.exports.createComment = async (req, res) => {
  console.log("create comment start!!: ", req.params.commentId);
  return res.status(200).json(await boardService.createComment(req));
};

module.exports.getCommentListByPostId = async (req, res) => {
  console.log("get comment list start!!: ", req.params.commentId);
  return res.status(200).json(await boardService.getCommentListByPostId(req));
};

module.exports.updateCommentByCommentId = async (req, res) => {
  console.log("update comment start!!: ", req.params.commentId);
  return res.status(200).json(await boardService.updateCommentByCommentId(req));
};

module.exports.deleteCommentByCommentId = async (req, res) => {
  console.log("delete comment start!!: ", req.params.commentId);
  return res.status(200).json(await boardService.deleteCommentByCommentId(req));
};
