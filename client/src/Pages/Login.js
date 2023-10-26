import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUserInfo }) {
  const navigate = useNavigate();
  const checkSession = async () => {
    const response = await axios.get('http://localhost:3000/api/users/session', { withCredentials: true });
    console.log("세션 정보 : ", response.data.user);
    if(response.data.user){
      navigate('/posts');
    }
    return response.data.user;
  }
  useEffect(() => {
    checkSession();
  }, [])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password }, { withCredentials: true });
      setUserInfo({ id: response.data.user._id, email: response.data.user.email, name: response.data.user.name })
      navigate(-1);

    } catch (error) {
      console.error('로그인 오류:', error);
      alert(`로그인 실패 : ${error}`);
    }
  };



  return (
    <Container style={{width:700}}>
      <h2 className='mb-5'>로그인</h2>

      <div className='d-grid gap-1'>
        <Form.Control 
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-1'
        />
        <Form.Control 
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-1'
        />
        <Button onClick={handleLogin}>로그인</Button>
      </div>


    </Container>
  );
}

export default Login;