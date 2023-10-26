// reviewRouter.js 파일

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// 리뷰 생성 (Create)
router.post('/', reviewController.createReview);

// 모든 리뷰 조회 (Read)
router.get('/', reviewController.getAllReviews);

// 해당영화 리뷰 조회 (Read)
router.get('/by-movie_id/:movie_id', reviewController.getReviewsByMovie_id);

module.exports = router;