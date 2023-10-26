// userRouter.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 유저 등록
router.post('/', userController.createUser);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/session',userController.checkSession);
module.exports = router;