const express = require("express");
const boardRoute = express.Router();
const authMiddleware = require("./../middlewares/authMiddleware.js");
const boardController = require("./../Controller/BoardController.js");

const { boardSchema } = require('../schemas/boardSchema');
const { validateMiddleware } = require('../middlewares/validateMiddleware');

//authMiddleware,
boardRoute.get("/posts", authMiddleware, boardController.getPostList); // O
boardRoute.get("/posts/:postId", authMiddleware, boardController.getPostByPostId); // O
boardRoute.get("/posts/:postId/edit", authMiddleware, boardController.getPostEditByPostId); // O

boardRoute.post("/posts", validateMiddleware(boardSchema.createPost), authMiddleware, boardController.createPost);
boardRoute.patch("/posts/:postId", validateMiddleware(boardSchema.updatePost), authMiddleware, boardController.updatePostByPostId);
boardRoute.delete("/posts/:postId", authMiddleware, boardController.deletePostByPostId);

boardRoute.post("/comments", validateMiddleware(boardSchema.comment), authMiddleware, boardController.createComment);
boardRoute.patch(
  "/comments/:commentId",
  authMiddleware,
    validateMiddleware(boardSchema.comment),
    boardController.updateCommentByCommentId,
);
boardRoute.delete(
  "/comments/:commentId",
  authMiddleware,
  boardController.deleteCommentByCommentId,
);

boardRoute.post("/posts/like/:postId", authMiddleware, boardController.likePost);
boardRoute.post("/posts/unlike/:postId", authMiddleware, boardController.unLikePost);

module.exports = boardRoute;
