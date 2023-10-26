import React, {useEffect, useState} from 'react';
import { Button, Card, Pagination, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

function formatDate(inputDate) {
  const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
  return formattedDate;
}

const Movie = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perpage = 15; // 페이지당 항목 수 (고정)
  const [maxPage, setMaxPage] = useState(100);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 데이터 다시 가져오기



  const fetchData = async () => {
    if (currentPage == 0) {
      setCurrentPage(1);
      return;
    } 
    else if (currentPage > maxPage) {
      setCurrentPage(crnt => crnt-1)
      return;
    }
    await axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=bbba5ebfd151ae4575f0ef194876edf1&language=ko-KR&page=${currentPage}&perpage=${perpage}`)
      .then((response)=>{
        setMovies(response.data.results);
        setMaxPage(response.data.total_results/perpage);
      })
      .catch((error) => {
        console.error('MOVIE GET 요청에 실패했습니다.',error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage((crnt) => page);
  };

  return (
    <div className='container'>
      <Row>
        {movies.map((movie, index) => (
          <Col xs={12} md={4} lg={3} key={index}>
            <a href={`/movies/${movie.id}`}>
            <Card style={{minHeight:660, marginBottom:25}}>
              <Card.Img variant='top' src={ "https://image.tmdb.org/t/p/w300/"+movie.poster_path } />
              <Card.Body>
                <Card.Title>{ movie.title }</Card.Title>
                <Card.Text>{ movie.overview.substr(0,30)+".." }</Card.Text>
                <Button variant="secondary" className='mt-3 float-end'>상세보기</Button>
              </Card.Body>
            </Card>
            </a>
          </Col>
        ))}
      </Row>
      <div>
        <Pagination className="justify-content-center">
          <Pagination.Prev  onClick={() => { handlePageChange(currentPage - 1) }}/>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next  onClick={() => { handlePageChange(currentPage + 1) }}/>
        </Pagination>
      </div>
    </div>
  )
  

};

export default Movie;