// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Username cannot ba blank'],
        unique: true
    },
    password: {//해시된 비밀번호가 저장됨
        type: String,
        required: [true, 'Password cannot ba blank']
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('User', userSchema);