const post = require('../Model/Post');
const comment = require('../Model/Comment');
const {json} = require("express");


module.exports.getPostList = async (req, res) => {

}

module.exports.createPost = async (req, res) => {
    return post.createPost(req.body.title, req.body.content, req.body.email);
}

module.exports.getPostByPostId = async (req, res) => {
    const result = await post.getPostByPostId(req.params.postId);
    result["postId"] = req.params.postId;
    result["comment"] = await comment.getCommentListByPostId(req.params.postId) || "";
    return result;
}

module.exports.patchPostViews = async (req, res) => {
    return post.addPostViews(req.params.postId);
}

module.exports.updatePostByPostId = async (req, res) => {

}

module.exports.deletePostByPostId = async (req, res) => {
    return await post.deleteById(req.params.postId);
}

module.exports.createComment = async (req, res) => {

}

module.exports.getCommentListByPostId = async (req, res) => {

}

module.exports.updateCommentByCommentId = async (req, res) => {

}

module.exports.deleteCommentByCommentId = async (req, res) => {

}