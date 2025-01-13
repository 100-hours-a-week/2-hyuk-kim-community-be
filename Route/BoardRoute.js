const express = require("express");
const boardRoute = express.Router();
const boardController = require("./../Controller/BoardController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");
const { upload } = require('../middlewares/imageMiddleware');
//authMiddleware,
boardRoute.get("/posts", boardController.getPostList); // O
boardRoute.get("/posts/:postId", authMiddleware, boardController.getPostByPostId); // O
boardRoute.get("/posts/:postId/edit", authMiddleware, boardController.getPostEditByPostId); // O

boardRoute.post("/posts", upload.single('image'), authMiddleware, boardController.createPost);
boardRoute.patch("/posts/:postId", upload.single('image'), authMiddleware, boardController.updatePostByPostId);
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
