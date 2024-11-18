const express = require("express");
const boardRoute = express.Router();
const boardController = require("./../Controller/BoardController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");
//authMiddleware,
boardRoute.get("/posts", boardController.getPostList); // O
boardRoute.get("/posts/:postId", boardController.getPostByPostId); // O
boardRoute.get("/posts/:postId/edit", boardController.getPostEditByPostId); // O

boardRoute.post("/posts", boardController.createPost);
boardRoute.patch("/posts/:postId", boardController.updatePostByPostId);
boardRoute.delete("/posts/:postId", boardController.deletePostByPostId);

boardRoute.post("/comments", boardController.createComment);
boardRoute.put("/comments/:commentId", boardController.updateCommentByCommentId);
boardRoute.delete("/comments/:commentId", boardController.deleteCommentByCommentId);

module.exports = boardRoute;
