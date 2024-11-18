const BoardErrorCode = require("../common/errors/boardErrorCode");
const post = require("../Model/Post");
const comment = require("../Model/Comment");

// 페이징 추가 필요!
module.exports.getPostList = async () => {
  const list = await post.getPostList();
  for (const key of Object.keys(list)) {
    list[key].comment = (await comment.getCommentListByPostId(key)) || {};
  }
  return list;
};

module.exports.createPost = async (req) => {
  const {title, content, email} = req.body;
  await validateFields(req.body, ['title', 'content', 'email']);
  return post.createPost(title, content, email);
};

module.exports.getPostByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ['postId']);
  await validatePost(postId);
  const result = await post.getPostByPostId(postId);
  result["postId"] = req.params.postId;
  result["comment"] =
    (await comment.getCommentListByPostId(req.params.postId)) || {};
  await post.addPostViews(postId);
  return result;
};

module.exports.getPostEditByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ['postId']);
  await validatePost(postId);
  return await post.getPostEditByPostId(postId);
};

module.exports.patchPostViews = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ['postId']);
  await validatePost(postId);
  return post.addPostViews(postId);
};

module.exports.updatePostByPostId = async (req) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  await validateFields(req.params, ['postId']);
  await validateFields(req.body, ['title', 'content']);
  await validatePost(postId);
  return post.updatePostByPostId(postId, title, content);
};

module.exports.deletePostByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ['postId']);
  await validatePost(postId);
  return await post.deleteById(postId);
};

module.exports.createComment = async (req) => {
  const {postId, content, email} = req.body;
  await validateFields(req.body, ['postId', 'content', 'email']);
  await validatePost(postId);
  return await comment.createComment(postId, content, email);
};

module.exports.updateCommentByCommentId = async (req) => {
  const {commentId} = req.params;
  const {content, email} = req.body;
  await validateFields(req.params, ['commentId']);
  await validateFields(req.body, ['content', 'email']);
  await validateComment(commentId);
  return await comment.updateComment(commentId, content, email);
};

module.exports.deleteCommentByCommentId = async (req) => {
  const {commentId} = req.params;
  await validateFields(req.params, ['commentId']);
  await validateComment(commentId);
  return await comment.deleteComment(commentId);
};

// 필수값 데이터 검증
const validateFields = (fields, required) => {
  for (const field of required) {
    if (!fields[field]) throw BoardErrorCode.createInvalidFormat();
  }
};

// 게시글 id 에 맞는 게시글 있는지 검증
const validatePost = async (postId) => {
  const result = await post.getPostByPostId(postId);
  if (!result) throw BoardErrorCode.createBoardNotFound();
  return result;
};

// 댓글 id 에 맞는 댓글 있는지 검증
const validateComment = async (commentId) => {
  const result = await comment.getCommentById(commentId);
  if (!result) throw BoardErrorCode.createCommentNotFound();
  return result;
};