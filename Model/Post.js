const fileSystem = require("../config/fileManager");
const { getCurrentFormattedDate } = require("../util/DateManager");
const { v4: uuidv4 } = require("uuid");
const filePath = "./data/post.json";

const Post = {
  async getPostList() {
    return await fileSystem.readFile(filePath);
  },

  async createPost(title, content, email) {
    const postList = await fileSystem.readFile(filePath);
    const id = uuidv4();
    postList[id] = {
      title,
      content,
      email,
      countView: 0,
      countLike: 0,
      date: getCurrentFormattedDate(),
    };
    await fileSystem.saveFile(filePath, postList);
    return id;
  },

  async getPostByPostId(postId) {
    const postList = await fileSystem.readFile(filePath);
    postList[postId].countView += 1;
    await fileSystem.saveFile(filePath, postList);
    return postList[postId];
  },

  async getPostEditByPostId(postId) {
    const postList = await fileSystem.readFile(filePath);
    const result = {
      title: postList[postId].title,
      content: postList[postId].content,
    };
    return result;
  },

  async addPostViews(postId) {
    const postList = await fileSystem.readFile(filePath);
    postList[postId].countView += 1;
    await fileSystem.saveFile(filePath, postList);
    return postList[postId].countView;
  },

  async updatePostByPostId(postId, title, content) {
    const postList = await fileSystem.readFile(filePath);
    console.log(postList, "/ ", title, " / ", content);
    postList[postId].title = title;
    postList[postId].content = content;
    await fileSystem.saveFile(filePath, postList);
    return 1;
  },

  async deleteById(postId) {
    const postList = await fileSystem.readFile(filePath);
    delete postList[postId];
    await fileSystem.saveFile(filePath, postList);
    return 1;
  },
};

module.exports = Post;
