const BoardErrorCode = require("../common/codes/boardErrorCode");
const postModel = require("../Model/PostModel");
const commentModel = require("../Model/CommentModel");
const {uploadImage} = require("../utils/imageUploader");

module.exports.getPostList = async (req) => {
  const userId = req.user?.userId;
  const { page = 1 , limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { posts, totalCount } = await postModel.getPostList(offset, limit, userId);
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
  const userId = req.user?.userId;
  const postId = req.params.postId;
  await validatePost(postId);
  return await postModel.getPostByPostId(postId, userId);
};

// 댓글 페이지네이션
module.exports.getCommentListByPostId = async (req) => {
  const userId = req.user?.userId;
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  await validatePost(postId);

  return await postModel.getCommentListByPostId(postId, userId, page, limit);
};

module.exports.getPostEditByPostId = async (req) => {
  const postId = req.params.postId;
  await validatePost(postId);
  return await postModel.getPostEditByPostId(postId);
};

module.exports.updatePostByPostId = async (req) => {
  console.log(req.body);
  const postId = req.params.postId;
  const { title, content } = req.body.post;
  await validatePost(postId);
  return postModel.updatePostByPostId(postId, title, content);
};

module.exports.deletePostByPostId = async (req) => {
  const postId = req.params.postId;
  await validatePost(postId);
  await postModel.deleteById(postId);
  await commentModel.deleteCommentListByPostId(postId);
  return await postModel.deleteById(postId);
};

module.exports.createComment = async (req) => {
  const { postId, content, userId } = req.body;
  await validatePost(postId);
  return await commentModel.createComment(postId, content, userId);
};

module.exports.updateCommentByCommentId = async (req) => {
  const userId = req.user?.userId;
  const { commentId } = req.params;
  const { content } = req.body; // 작성자 검증 필요
  await validateComment(commentId);
  return await commentModel.updateComment(commentId, content);
};

module.exports.deleteCommentByCommentId = async (req) => {
  const { commentId } = req.params;
  await validateComment(commentId);
  return await commentModel.deleteComment(commentId);
};

module.exports.likePost = async (req) => {
  const userId = req.user?.userId;
  const { postId } = req.params;
  return await postModel.likePost(postId, userId);
};

module.exports.unLikePost = async (req) => {
  const userId = req.user?.userId;
  const { postId } = req.params;
  return await postModel.unLikePost(postId, userId);
};

// 게시글 id 에 맞는 게시글 있는지 검증
const validatePost = async (postId) => {
  // const result = await postModel.getPostByPostId(postId);
  // if (!result) throw BoardErrorCode.createBoardNotFound();
  // return result;
  return true;
};

// 댓글 id 에 맞는 댓글 있는지 검증
const validateComment = async (commentId) => {
  const result = await commentModel.getCommentById(commentId);
  if (!result) throw BoardErrorCode.createCommentNotFound();
  return result;
};
