import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';


function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async () => {
    // 이메일 형식 검사 (간단한 형식으로 예시입니다)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      setEmailError('올바른 이메일 형식을 입력하세요.');
      return;
    } else {
      setEmailError('');
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordError('');
    }

    // 회원가입 요청 보내기
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        email,
        password,
        name,
      });
      console.log('회원가입 결과:', response);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <Container style={{width:700}}>
        <h2 className='mb-5'>회원가입</h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              이메일
            </Form.Label>
            <Col sm="9">
              <Form.Control type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Col>
          </Form.Group>
          <span className="error-message">{emailError}</span> {/* 이메일 형식 에러 표시 */}

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
              비밀번호
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
              비밀번호 확인
            </Form.Label>
            <Col sm="9">
              <Form.Control 
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <span className="error-message">{passwordError}</span> {/* 비밀번호 일치 에러 표시 */}

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              닉네임
            </Form.Label>
            <Col sm="9">
              <Form.Control  
                type="text"
                placeholder="닉네임을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button onClick={handleSignup}>회원가입</Button>
            </Col>
          </Form.Group>
        </Form>        
    </Container>
  );
}

export default Signup;