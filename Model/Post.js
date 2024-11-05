const fileSystem = require('../config/fileManager');
const { v4: uuidv4 } = require("uuid");
const filePath = './data/post.json';

const Post = {

    async createPost(title, content, email) {
        const postList = await fileSystem.readFile(filePath);
        const id = uuidv4();
        postList[id] = {title, content, email, countView: 0, countLike: 0};
        await fileSystem.saveFile(filePath, postList);
        return id;
    },

    async getPostByPostId(postId) {
        const postList = await fileSystem.readFile(filePath);
        return postList[postId];
    }
}

module.exports = Post;