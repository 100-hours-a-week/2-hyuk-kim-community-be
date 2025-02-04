const { boardSchema } = require('../schemas/boardSchema');
const { validateMiddleware } = require('../middlewares/validateMiddleware');

const express = require("express");
const boardRoute = express.Router();
const boardController = require("./../Controller/BoardController.js");
const authMiddleware = require("./../middlewares/authMiddleware.js");
const { upload } = require('../middlewares/imageMiddleware');

//authMiddleware,
boardRoute.get("/posts", authMiddleware, boardController.getPostList); // O
boardRoute.get("/posts/:postId", authMiddleware, boardController.getPostByPostId); // O
boardRoute.get("/posts/:postId/edit", authMiddleware, boardController.getPostEditByPostId); // O

boardRoute.post("/posts", upload.single('image'), validateMiddleware(boardSchema.createPost), authMiddleware, boardController.createPost);
boardRoute.patch("/posts/:postId", upload.single('image'), validateMiddleware(boardSchema.updatePost), authMiddleware, boardController.updatePostByPostId);
boardRoute.delete("/posts/:postId", authMiddleware, boardController.deletePostByPostId);

boardRoute.post("/comments", authMiddleware, validateMiddleware(boardSchema.comment), boardController.createComment);
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
