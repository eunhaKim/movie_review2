// postRouter.js 파일

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 게시물 생성 (Create)
router.post('/', postController.createPost);

// 모든 게시물 조회 (Read)
router.get('/', postController.getAllPosts);

// 게시물 조회 (Read) by 게시물ID
router.get('/:id', postController.getPostByPostId);

// 게시물 조회 (Read) by 카테고리
router.get('/by-category/:category', postController.getPostsByCategory);

// 게시물 조회 (Read) by 유저ID
router.get('/by-author/:id', postController.getPostByAuthorId);

// 게시물 수정 (Update)
router.put('/:id', postController.updatePost);

// 게시물 삭제 (Delete)
router.delete('/:id', postController.deletePost);

module.exports = router;