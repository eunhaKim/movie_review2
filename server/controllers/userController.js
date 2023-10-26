const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hash = await bcrypt.hash(password, 12);//비밀번호로 해시, work factor : 숫자 클수
        console.log("hash함수를 통과한 비밀번호 : ",hash);
        const user = new User({
            email,//유저네임은 그대로
            password: hash, //비밀번호는 해시된거로
            name
        });
        await user.save();//데이터베이스에 저장
        res.status(201).json(user);
    } catch (e) {

        res.status(500).json(e);

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 데이터베이스에서 해당 이메일을 가진 사용자를 찾습니다.
        const user = await User.findOne({ email });

        if (!user) {
            // 사용자가 존재하지 않을 때 오류 메시지를 반환합니다.
            return res.status(401).json({ message: '해당 이메일로 등록된 사용자가 없습니다.' });
        }

        // 사용자의 비밀번호와 입력된 비밀번호를 비교합니다.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        
        if (isPasswordValid) {
            // 비밀번호가 일치할 때 작동되는 부분
            /**----추가된 코드1---- */
            console.log("로그인 이전 세션",req.session);
            req.session.user = {id:user.id,name:user.name,email:user.email};
            console.log("로그인 이후 세션",req.session);
            /**------------------- */
            return res.status(200).json({message:"로그인 성공",user});
        } else {
            // 비밀번호가 일치하지 않을 때 오류 메시지를 반환합니다.
            console.log('불일치');
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (error) {
        // 오류가 발생한 경우 500 상태 코드와 오류 메시지를 반환합니다.
        console.log(error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

/**---추가된 코드2 ---- */
exports.logout = async (req, res) => {
    console.log("로그아웃 이전 세션",req.session);
    req.session.destroy();
    console.log("로그아웃 이후 세션",req.session);
    res.status(200).send('로그아웃 성공!');
  }

/**------------------- */


/**----추가된 코드 3--- */
exports.checkSession = (req,res)=>{
    console.log("현재 세션 확인",req.session);
    res.send(req.session);
  }
/**------------------- */