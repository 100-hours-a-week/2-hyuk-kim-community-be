const post = require('../Model/Post');
const comment = require('../Model/Comment');


module.exports.getPostList = async (req, res) => {

}

module.exports.createPost = async (req, res) => {
    return post.createPost(req.body.title, req.body.content, req.body.email);
}

module.exports.getPostByPostId = async (req, res) => {
    const result = await post.getPostByPostId(req.params.postId);
    result["comment"] = await comment.getCommentListByPostId(req.params.postId) || "";
    console.log("result : " + JSON.stringify(result));
    return result;
}

module.exports.updatePostByPostId = async (req, res) => {

}

module.exports.deletePostByPostId = async (req, res) => {

}

module.exports.createComment = async (req, res) => {

}

module.exports.getCommentListByPostId = async (req, res) => {

}

module.exports.updateCommentByCommentId = async (req, res) => {

}

module.exports.deleteCommentByCommentId = async (req, res) => {

}