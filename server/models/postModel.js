const mongoose = require('mongoose');

// 게시판 글(Post) 모델의 스키마 정의
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        default: 0,
    },
    category:{
        type:[String]
    }  // 문자열 배열
},
    {
        timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가
    });

// Post 모델 생성
const Post = mongoose.model('Post', postSchema,'posts');

module.exports = Post; 