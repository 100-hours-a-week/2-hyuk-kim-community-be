const fileSystem = require('../config/fileManager');
const filePath = './data/comment.json';

const Comment = {
    constructor() {

    },

    async getCommentListByPostId(postId) {
        const commentList = await fileSystem.readFile(filePath);
        // console.log("commentList : ", commentList);
        const filteredComments = Object.fromEntries(
            Object.entries(commentList).filter(([key, item]) => item.postId === postId)
        );
        // console.log("filter: ", filteredComments);
        return filteredComments;
        // return commentList[postId];
    },
}

module.exports = Comment;