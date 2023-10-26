const mongoose = require('mongoose');

// 리뷰글(Review) 모델의 스키마 정의
const reviewSchema = new mongoose.Schema({
    movie_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
  },
  {
      timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가
  }
);

// Post 모델 생성
const Review = mongoose.model('Review', reviewSchema,'reviews');

module.exports = Review; 