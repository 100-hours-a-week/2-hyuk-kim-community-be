const fileSystem = require("../config/fileManager");
const { v4: uuidv4 } = require("uuid");
const { getCurrentFormattedDate } = require("../util/DateManager");
const filePath = "./data/comment.json";

const Comment = {
  constructor() {},

  async getCommentListByPostId(postId) {
    const commentList = await fileSystem.readFile(filePath);
    return Object.fromEntries(
      Object.entries(commentList).filter(
        ([key, item]) => item.postId === postId,
      ),
    );
  },

  async createComment(postId, content, email) {
    const commentList = await fileSystem.readFile(filePath);
    const id = uuidv4();
    commentList[id] = {
      postId: postId,
      content: content,
      email: email,
      date: getCurrentFormattedDate(),
    };
    await fileSystem.saveFile(filePath, commentList);
    return id;
  },

  async updateComment(commentId, content) {
    const commentList = await fileSystem.readFile(filePath);
    commentList[commentId].content = content;
    await fileSystem.saveFile(filePath, commentList);
    return 1;
  },

  async deleteComment(commentId) {
    const commentList = await fileSystem.readFile(filePath);
    delete commentList[commentId];
    await fileSystem.saveFile(filePath, commentList);
    return 1;
  },
};

module.exports = Comment;
