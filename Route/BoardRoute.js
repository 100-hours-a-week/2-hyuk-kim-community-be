const express = require('express');
const boardRoute = express.Router();
const boardController = require('./../Controller/BoardController.js');

// boardRoute.get('/api/posts', boardController.loginByCookie);
// boardRoute.post('/api/posts', boardController.loginByCookie);
// boardRoute.get('/api/posts/{postId}', boardController.loginByCookie);
// boardRoute.patch('/api/posts/{postId}', boardController.loginByCookie);
// boardRoute.delete('/api/posts/{postId}', boardController.loginByCookie);
// boardRoute.post('/api/posts/{postId}/comments', boardController.loginByCookie);
// boardRoute.get('/api/posts/{postId}/comments', boardController.loginByCookie);
// boardRoute.put('/api/posts/{postId}/comments/{commentId}', boardController.loginByCookie);
// boardRoute.delete('/api/posts/{postId}/comments/{commentId}', boardController.loginByCookie);

module.exports = boardRoute;