import React, { useEffect, useState } from 'react';
import { Container, Button, Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function formatDate(inputDate) {
  const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
  return formattedDate;
}

function Board() {
  const navigate = useNavigate();
  const checkSession = async ()=>{
    const response = await axios.get('http://localhost:3000/api/users/session',{withCredentials:true});
    if(!response.data.user){
      navigate('/login');
    }
    return response.data.user;
  }
  // useEffect(()=>{
  //   checkSession(); 
  // },[])
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perpage = 10; // 페이지당 항목 수 (고정)
  const [maxPage, setMaxPage] = useState(100);

  const fetchData = async () => {
    if (currentPage == 0) {
      setCurrentPage(1)
      return;
    }
    else if (currentPage > maxPage) {
      setCurrentPage(crnt => crnt - 1)
      return;
    }
    await axios
      .get(`http://localhost:3000/api/posts?page=${currentPage}&perpage=${perpage}`)
      .then((response) => {
        setPosts(response.data.posts);
        setMaxPage(response.data.totalPages)
      })
      .catch((error) => {
        console.error('GET 요청에 실패했습니다:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 데이터 다시 가져오기

  const handlePageChange = (page) => {
    setCurrentPage((crnt) => page);
  };

  const getCategory = async (category) => {
    await axios.get(`http://localhost:3000/api/posts/by-category/${category}`)
      .then((response) => {
        setPosts(response.data);

      })
  }

  return (
    
      <Container>

        

        <div className='text-center mb-5'>
          <h3>카테고리로 보기</h3>
          {['게임', '요리', '독서', '취미', '운동', '공부', '기타', '일상'].map((e) => { return <span onClick={() => { getCategory(e) }} key={e} className="badge btn bg-secondary ms-2">{e}</span> })}
        </div>
        
        
        <Table className='text-center' responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
              <th>조회수</th>
              <th>카테고리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>
                  <Link style={{ textDecoration: 'None' }} to={`/posts/${post._id}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{formatDate(post.createdAt)}</td>
                <td>{post.view}</td>
                <td>{post.category.map((e) => { return <span key={e} className="badge bg-secondary ms-2">{e}</span> })}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end">
          <a href='/posts/write' className='btn btn-sm btn-outline-secondary'>글쓰기</a>
        </div>

        <div className='mt-5'>
          <Pagination className="justify-content-center"  size="sm">
            <Pagination.Prev  onClick={() => { handlePageChange(currentPage - 1) }}/>
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next  onClick={() => { handlePageChange(currentPage + 1) }}/>
          </Pagination>
        </div>

      </Container>
    
  );
};

export default Board;