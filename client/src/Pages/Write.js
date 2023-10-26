import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Edit.css";
import { Form, Card, Container, Button } from "react-bootstrap";

function Write() {
  const navigate = useNavigate();
  const checkSession = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/users/session",
      { withCredentials: true }
    );
    if (!response.data.user) {
      navigate("/login");
    }
    return response.data.user;
  };
  useEffect(() => {
    checkSession();
  }, []);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: [],
    author: "",
  });

  // 입력 필드 값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  // 카테고리를 선택할 때 상태 업데이트
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNewPost({
        ...newPost,
        category: [...newPost.category, value],
      });
    } else {
      setNewPost({
        ...newPost,
        category: newPost.category.filter((category) => category !== value),
      });
    }
  };

  // 수정 버튼을 클릭할 때의 동작 (PUT 요청 등을 수행)
  const handleEdit = async () => {
    console.log("바꿀 내용 : ", newPost);
    await axios
      .post(`http://localhost:3000/api/posts`, newPost, {
        withCredentials: true,
      })
      .then((response) => {
        // 요청이 성공했을 때의 동작
        console.log("성공적으로 post 요청을 보냈습니다.", response.data);
        alert("등록되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        // 요청이 실패했을 때의 동작
        console.error("PUT 요청에 실패했습니다.", error);
      });
  };

  return (
    <>
      {newPost ? (
        <Container>
          <h1 className="mb-5">새 글 쓰기</h1>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="author" className="mb-3">
              <Form.Label>등록할 아이디</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newPost.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="content" className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>카테고리(복수 응답 가능)</Form.Label>
              {[
                "게임",
                "요리",
                "독서",
                "취미",
                "운동",
                "공부",
                "기타",
                "일상",
              ].map((category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category}
                  value={category}
                  onChange={handleCategoryChange}
                  checked={newPost.category.includes(category)}
                />
              ))}
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleEdit}>
              등록
            </Button>
            <Button
              className="ms-2"
              variant="danger"
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Button>
          </Form>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default Write;
