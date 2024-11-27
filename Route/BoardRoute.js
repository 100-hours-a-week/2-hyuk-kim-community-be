const express = require("express");
const boardRoute = express.Router();
const boardController = require("./../Controller/BoardController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");
//authMiddleware,
boardRoute.get("/posts", boardController.getPostList); // O
boardRoute.get("/posts/:postId", boardController.getPostByPostId); // O
boardRoute.get("/posts/:postId/edit", boardController.getPostEditByPostId); // O

boardRoute.post("/posts", authMiddleware, boardController.createPost);
boardRoute.patch("/posts/:postId", authMiddleware, boardController.updatePostByPostId);
boardRoute.delete("/posts/:postId", authMiddleware, boardController.deletePostByPostId);

boardRoute.post("/comments", authMiddleware, boardController.createComment);
boardRoute.patch(
  "/comments/:commentId",
  authMiddleware,
  boardController.updateCommentByCommentId,
);
boardRoute.delete(
  "/comments/:commentId",
  authMiddleware,
  boardController.deleteCommentByCommentId,
);

module.exports = boardRoute;
