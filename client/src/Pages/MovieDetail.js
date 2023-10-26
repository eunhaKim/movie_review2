import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import StarRating from '../Components/StarRating';


function MovieDetail() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", name: "", id: "" });
  
  useEffect(()=>{
    // React에서 비동기 코드를 사용하여 서버에서 데이터를 가져와서 setUserInfo 함수를 실행하려면 try...catch 블록 내에서 비동기 작업을 처리하는 것이 일반적입니다. 
    const checkSession = async ()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/users/session',{withCredentials:true});
        console.log("영화상세 세션 정보 : ",res.data.user);
  
        if (res.data.user) {
          setUserInfo(res.data.user);
          setNewReview({
            ...newReview,
            author: res.data.user.name
          });
          
        }
        // return response.data.user;
      } catch (error) {
        console.error("영화상세 세션 확인 중 에러 발생: ", error);
      }
    };

    checkSession();
  },[])
  const { movie_id } = useParams(); // 현재 보여지는 영화id
  const [crntMovie, setCrntMovie] = useState(null); // 현재 보여지는 영화정보들 
  const [reviews, setReviews] = useState([]); // 리뷰들 가져온것
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perpage = 10; // 페이지당 항목 수 (고정)
  const [maxPage, setMaxPage] = useState(100);
  const [newReview, setNewReview] = useState({
    movie_id: movie_id,
    content: '',
    author: '',
    rating: 3
  }); // 작성할 리뷰

  

  // 입력 필드 값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
        ...newReview,
        [name]: value,
    });
  };


  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=bbba5ebfd151ae4575f0ef194876edf1&language=ko-KR`)
      .then(response => {
        // 요청이 성공하면 데이터를 상태(state)에 저장합니다.
        setCrntMovie(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        // 요청이 실패하면 에러를 처리합니다.
        console.error('GET 요청에 실패했습니다:', error);
      });
  },[])

  const fetchData = async () => {
    if (currentPage == 0) {
      setCurrentPage(1);
      return;
    }
    else if (currentPage > maxPage) {
      setCurrentPage(crnt => crnt - 1);
      return;
    }
    await axios
      .get(`http://localhost:3000/api/reviews/by-movie_id/${movie_id}?page=${currentPage}&perpage=${perpage}`)
      .then((response) => {
        setReviews(response.data.reviews);
        setMaxPage(response.data.totalPages);
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



  // 등록할 때의 동작 (PUT 요청 등을 수행)
  const handleEdit = async () => {
    if(!newReview.author){
      alert("로그인해야 리뷰를 작성하실수 있습니다.");
      navigate('/login');
    }
    
    console.log("등록 내용 : ",newReview);
    await axios.post(`http://localhost:3000/api/reviews`, newReview,{withCredentials:true})
      .then(response => {
          // 요청이 성공했을 때의 동작
          console.log('성공적으로 post 요청을 보냈습니다.', response.data);
          alert("리뷰가 등록되었습니다.");
          window.location.reload();
          // navigate(-1);
          
      })
      .catch(error => {
          // 요청이 실패했을 때의 동작
          console.error('PUT 요청에 실패했습니다.', error);
      }
    );
  };

    


  return (
    <div className='container'>
      {crntMovie ? 
        <>
          <h3>{crntMovie.title}</h3>
          <p>{crntMovie.genres.map((e) => (<span key={e.id} className="badge bg-secondary" style={{marginRight:5}}>{e.name}</span>))}</p>
          <hr />
          <Row className='mt-5'>
            <Col md={3} sm={12}>
              {<img src={ "https://image.tmdb.org/t/p/w500/"+crntMovie.poster_path } alt={crntMovie.title} />}
            </Col>
            <Col md={9} sm={12}>
              <h4 className='mt-3 mb-3'>기본정보</h4>
              <p>개봉일: {crntMovie.release_date}</p>
              <h5 className='text-primary'>{crntMovie.tagline}</h5>
              <p>{crntMovie.overview}</p>
            </Col>
          </Row>     
          <div id='review'>
            <div className='text-center' style={{marginTop:100}}>
              <h4 className='mb-4'><Badge bg="warning">리뷰</Badge></h4>

              <Form>
                <p>별점을 선택해주세요.</p>

                {/* notion 하위 컴포넌트가 상위 컴포넌트로 값을 전달하는 방법 적용 */}
                <StarRating 
                  selectedStars={newReview.rating} 
                  onRate={(rating) => setNewReview({...newReview,rating:rating})}
                />

                <InputGroup className="mt-5 mb-5" id="content">
                  <Form.Control
                    type="text"
                    name="content"
                    value={newReview.content}
                    placeholder={userInfo.name ? `${userInfo.name}님의 리뷰를 작성해주세요.` : '로그인후 리뷰를 작성해주세요'}
                    onChange={handleInputChange}
                    aria-label="Recipient's review"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="primary" id="button-addon2" onClick={handleEdit}>
                    등록
                  </Button>
                </InputGroup>
              </Form>
            </div>


            {reviews.map((review, index) => (
              <div className='media border p-3 ps-5 mb-3' key={index}>
                <img src="/img/img_avatar3.png" alt="작성자" className="mr-3 mt-3 rounded-circle" style={{width:60}} />
                
                <div className="media-body">
                  <p>작성자: {review.author}</p>
                  <div className='rating userRating'>
                    별점: {review.rating}&nbsp;
                    <StarRating selectedStars={review.rating} onRate={(rating) => setNewReview({...newReview,rating:rating})} />
                  </div>
                  <p>리뷰: {review.content}</p>
                  
                </div>
              </div>
            ))}

            <div>
              <Pagination className="justify-content-center">
                <Pagination.Prev  onClick={() => { handlePageChange(currentPage - 1) }}/>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next  onClick={() => { handlePageChange(currentPage + 1) }}/>
              </Pagination>
            </div>

          </div>
        </>
      : <p>none</p>}
    </div>
  )
}

export default MovieDetail