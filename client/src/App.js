// App.js
import './styles/App.css';
import axios from 'axios';

import Home from './Pages/Home';
import Movie from './Pages/Movie';
import MovieDetail from './Pages/MovieDetail';
import Board from './Pages/Board';
import Content from './Pages/Content';
import Edit from './Pages/Edit';
import Write from './Pages/Write';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";


function App() {
  const [userInfo, setUserInfo] = useState({ email: "", name: "", id: "" });
  const checkSession = async ()=>{
    const response = await axios.get('http://localhost:3000/api/users/session',{withCredentials:true});
    console.log("세션 정보 : ",response.data.user);
    if(response.data.user){
      setUserInfo(response.data.user);
    }
    
    return response.data.user;
  }
  useEffect(()=>{
    checkSession(); 
  },[])
  const handleLogout = async ()=>{
    axios.get('http://localhost:3000/api/users/logout',{withCredentials:true})
    .then(res=>setUserInfo({ email: "", name: "", id: "" }))
    .catch((err)=>{alert(err)})

  }
  return (
    <Router>
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Movie Review</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/movies">Movie Review</Nav.Link>
                <Nav.Link href="/posts">Community</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
              {userInfo.email ?
                <>
                  <Nav.Link href='/login' onClick={handleLogout}>로그아웃</Nav.Link>
                </>
                :
                <>
                  <Nav.Link href='/login'>로그인</Nav.Link>
                  <Nav.Link href='/signup'>회원가입</Nav.Link>
                </>
              }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      
      <main className="bg-body-tertiary pt-5 pb-5">
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<Signup ></Signup>}></Route>
          <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} ></Login>}></Route>
          <Route path="/movies" element={<Movie></Movie>}></Route>
          <Route path="/movies/:movie_id" element={<MovieDetail></MovieDetail>}></Route>
          <Route path="/posts" element={<Board></Board>}></Route>
          <Route path="/posts/write" element={<Write ></Write>}></Route>
          <Route path="/posts/:post_id" element={<Content ></Content>}></Route>
          <Route path="/edit/:user_id/:post_id" element={<Edit ></Edit>}></Route>
        </Routes>
        
      </main>

      <footer className='pt-4'>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/">회사소개</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">이용약관</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">개인정보처리방침</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              고객센터
            </Nav.Link>
          </Nav.Item>
        </Nav>
      
        <p className="text-center mt-4 mb-4">© Movie Review</p>
      </footer>

      
    </Router>
  );
}

export default App;