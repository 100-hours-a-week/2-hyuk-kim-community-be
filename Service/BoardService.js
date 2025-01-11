const BoardErrorCode = require("../common/errors/boardErrorCode");
const postModel = require("../Model/PostModel");
const commentModel = require("../Model/CommentModel");
const {uploadImage} = require("../utils/imageUploader");

// 페이징 추가 필요!
module.exports.getPostList = async (req) => {
  const { page = 1 , limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { posts, totalCount } = await postModel.getPostList(offset, limit);
  const hasMore = totalCount > offset + posts.length;

  return {
    posts,
    totalCount,
    hasMore
  };
};

module.exports.createPost = async (req) => {
  const userId  = req.user?.userId;
  const { title, content } = req.body.post;
  let imageUrl;
  if (req.file) {
    imageUrl = await uploadImage(req.file, "board");
  }
  console.log(`imageUrl: ${imageUrl}`);
  return postModel.createPost(title, content, userId, imageUrl);
};

module.exports.getPostByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ["postId"]);
  await validatePost(postId);
  const result = await postModel.getPostByPostId(postId);
  result["postId"] = req.params.postId;
  result["comment"] = (await commentModel.getCommentListByPostId(postId));
    // (await commentModel.getCommentListByPostId(req.params.postId)) || {};
  return result;
};

// 상태 관리로 상세페이지에서 넘겨주면 되니까 리액트로 변경시 없어질 API!
module.exports.getPostEditByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ["postId"]);
  await validatePost(postId);
  return await postModel.getPostEditByPostId(postId);
};

// module.exports.patchPostViews = async (req) => {
//   const postId = req.params.postId;
//   await validateFields(req.params, ["postId"]);
//   await validatePost(postId);
//   return postModel.addPostViews(postId);
// };

module.exports.updatePostByPostId = async (req) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  await validateFields(req.params, ["postId"]);
  await validateFields(req.body, ["title", "content"]);
  await validatePost(postId);
  return postModel.updatePostByPostId(postId, title, content);
};

module.exports.deletePostByPostId = async (req) => {
  const postId = req.params.postId;
  await validateFields(req.params, ["postId"]);
  await validatePost(postId);
  await postModel.deleteById(postId);
  await commentModel.deleteCommentListByPostId(postId);
  return await postModel.deleteById(postId);
};

module.exports.createComment = async (req) => {
  const { postId, content, userId } = req.body;
  await validateFields(req.body, ["postId", "content", "userId"]);
  await validatePost(postId);
  return await commentModel.createComment(postId, content, userId);
};

module.exports.updateCommentByCommentId = async (req) => {
  const { commentId } = req.params;
  const { content, userId } = req.body; // 작성자 검증 필요
  await validateFields(req.params, ["commentId"]);
  await validateFields(req.body, ["content", "userId"]);
  await validateComment(commentId);
  return await commentModel.updateComment(commentId, content);
};

module.exports.deleteCommentByCommentId = async (req) => {
  const { commentId } = req.params;
  await validateFields(req.params, ["commentId"]);
  await validateComment(commentId);
  return await commentModel.deleteComment(commentId);
};

// 필수값 데이터 검증
const validateFields = (fields, required) => {
  for (const field of required) {
    if (!fields[field]) throw BoardErrorCode.createInvalidFormat();
  }
};

// 게시글 id 에 맞는 게시글 있는지 검증
const validatePost = async (postId) => {
  const result = await postModel.getPostByPostId(postId);
  if (!result) throw BoardErrorCode.createBoardNotFound();
  return result;
};

// 댓글 id 에 맞는 댓글 있는지 검증
const validateComment = async (commentId) => {
  const result = await commentModel.getCommentById(commentId);
  if (!result) throw BoardErrorCode.createCommentNotFound();
  return result;
};
