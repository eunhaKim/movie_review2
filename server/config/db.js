const mongoose = require('mongoose');
require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일의 환경 변수를 로드합니다.
// 잠깐만!  env파일이란? - 내 프로젝트 전반적인 보안 정보들을 저장하는 파일
const { MONGODB_URI } = process.env;  // 나중에 만들 .env 파일에서 MONGODB_URI라는 변수를 가져올 
// MONGODB_URI란? : 내 데이터베이스 연결 주소.
// 그럼 왜 이걸 따로 보안자료로 관리? : 여기에 내 데이터베이스 id, 비밀번호 담겨있

// 아래는 우리의 mongodb 데이터베이스를 연결. 이 때, MONGODB_URI값을 사용함
// 그냥 설명서 개념. '이렇게 써라' 라고 mongodb에서 말해준대로 사용.
const connectDb = async () => { 
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        console.log(
            `Database connected: \nhost : ${connect.connection.host}\nDB name : ${connect.connection.name}`
            
        )
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDb;  // 외부 파일에서 connectDb 함수를 사용할 것이므로 export해줌.