//index.js

const express = require('express'); // Express.js 라이브러리 가져오기
const connectDb = require('./config/db');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const cors = require('cors');
const session = require('express-session');

connectDb();
const app = express(); // Express 애플리케이션을 생성. app변수는 애플리케이션 객체!!

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000; // 웹서버가 실행될 포토번호 설정

app.use(express.json());
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter); 
app.use('/api/reviews',reviewRouter);

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})