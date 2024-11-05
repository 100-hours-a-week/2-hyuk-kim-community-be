const fileSystem = require('../config/fileManager');
const filePath = './data/comment.json';

const Comment = {
    constructor() {

    },

    async getCommentListByPostId(postId) {
        const commentList = await fileSystem.readFile(filePath);
        return Object.fromEntries(
            Object.entries(commentList).filter(([key, item]) => item.postId === postId)
        );
    },
}

module.exports = Comment;