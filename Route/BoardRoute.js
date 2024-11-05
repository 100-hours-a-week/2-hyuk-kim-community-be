const express = require('express');
const boardRoute = express.Router();
const boardController = require('./../Controller/BoardController.js');

boardRoute.get('/posts', boardController.getPostList);
boardRoute.post('/posts', boardController.createPost);
boardRoute.get('/posts/:postId', boardController.getPostByPostId);
boardRoute.patch('/posts/:postId', boardController.updatePostByPostId);
boardRoute.delete('/posts/:postId', boardController.deletePostByPostId);
boardRoute.post('/posts/:postId/comments', boardController.createComment);
boardRoute.get('/posts/:postId/comments', boardController.getCommentListByPostId);
boardRoute.put('/posts/:postId/comments/:commentId', boardController.updateCommentByCommentId);
boardRoute.delete('/posts/:postId/comments/:commentId', boardController.deleteCommentByCommentId);

module.exports = boardRoute;