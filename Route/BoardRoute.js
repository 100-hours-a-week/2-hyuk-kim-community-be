const express = require("express");
const boardRoute = express.Router();
const boardController = require("./../Controller/BoardController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");

boardRoute.get("/posts", authMiddleware, boardController.getPostList);
boardRoute.post("/posts", boardController.createPost);
boardRoute.get("/posts/:postId", boardController.getPostByPostId);
boardRoute.get("/posts/:postId/edit", boardController.getPostEditByPostId);
boardRoute.patch("/posts/:postId", boardController.updatePostByPostId);
boardRoute.delete("/posts/:postId", boardController.deletePostByPostId);

boardRoute.post("/comments", boardController.createComment);
boardRoute.put("/comments/:commentId", boardController.updateCommentByCommentId);
boardRoute.delete("/comments/:commentId", boardController.deleteCommentByCommentId);

module.exports = boardRoute;
