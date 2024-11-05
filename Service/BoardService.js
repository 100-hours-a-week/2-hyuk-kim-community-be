const post = require('../Model/Post');
const comment = require('../Model/Comment');
const {json} = require("express");


module.exports.getPostList = async (req) => {

}

module.exports.createPost = async (req) => {
    return post.createPost(req.body.title, req.body.content, req.body.email);
}

module.exports.getPostByPostId = async (req) => {
    const result = await post.getPostByPostId(req.params.postId);
    result["postId"] = req.params.postId;
    result["comment"] = await comment.getCommentListByPostId(req.params.postId) || "";
    return result;
}

module.exports.patchPostViews = async (req) => {
    return post.addPostViews(req.params.postId);
}

module.exports.updatePostByPostId = async (req) => {

}

module.exports.deletePostByPostId = async (req) => {
    return await post.deleteById(req.params.postId);
}

module.exports.createComment = async (req) => {

}

module.exports.getCommentListByPostId = async (req, res) => {

}

module.exports.updateCommentByCommentId = async (req, res) => {

}

module.exports.deleteCommentByCommentId = async (req, res) => {

}