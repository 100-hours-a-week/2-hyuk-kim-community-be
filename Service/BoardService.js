const post = require('../Model/Post');
const comment = require('../Model/Comment');
const res = require("express/lib/response");

module.exports.getPostList = async () => {
    const list = await post.getPostList();
    for (const key of Object.keys(list)) {
        list[key].comment = await comment.getCommentListByPostId(key) || "";
    }

    return list;
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

module.exports.getPostEditByPostId = async (req) => {
    return await post.getPostEditByPostId(req.params.postId);
}

module.exports.patchPostViews = async (req) => {
    return post.addPostViews(req.params.postId);
}

module.exports.updatePostByPostId = async (req) => {
    return post.updatePostByPostId(req.params.postId, req.body.title, req.body.content);
}

module.exports.deletePostByPostId = async (req) => {
    return await post.deleteById(req.params.postId);
}


module.exports.createComment = async (req) => {
    console.log("createComment!! : ", JSON.stringify(req.body));
    return await comment.createComment(req.body.postId, req.body.content, req.body.email);
}

module.exports.updateCommentByCommentId = async (req) => {
    return await comment.updateComment(req.params.commentId, req.body.content, req.body.email);
}

module.exports.deleteCommentByCommentId = async (req) => {
    return await comment.deleteComment(req.params.commentId);
}