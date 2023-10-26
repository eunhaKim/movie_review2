import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Pagination,
  Badge,
} from "react-bootstrap";
import StarRating from "./StarRating";

function Review(props) {
  const navigate = useNavigate();
  const { movie_id, userInfo } = props;
  const [newReview, setNewReview] = useState({
    movie_id: movie_id,
    content: "",
    author: "",
    rating: 3,
  }); // 작성할 리뷰

  useEffect(() => {
    if(userInfo) {
      setNewReview({
        ...newReview,
        author:userInfo.name
      })
    }
  })


  // 리뷰 입력 필드 값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
        ...newReview,
        [name]: value,
    });
  };

  // 리뷰 등록할 때의 동작 (PUT 요청 등을 수행)
  const handleEdit = async () => {
    if(!userInfo){
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
    <div>
      <div className="text-center mt-5">
        <h4 className="mb-4">
          <Badge bg="warning">리뷰</Badge>
        </h4>

        <Form>
          <p>별점을 선택해주세요.</p>

          {/* notion 하위 컴포넌트가 상위 컴포넌트로 값을 전달하는 방법 적용 */}
          <StarRating
            selectedStars={newReview.rating}
            onRate={(rating) => setNewReview({ ...newReview, rating: rating })}
          />

          <InputGroup className="mt-5 mb-5" id="content">
            <Form.Control
              type="text"
              name="content"
              value={newReview.content}
              placeholder={
                userInfo.name
                  ? `${userInfo.name}님의 리뷰를 작성해주세요.`
                  : "로그인후 리뷰를 작성해주세요"
              }
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
    </div>
  );
}

export default Review;
