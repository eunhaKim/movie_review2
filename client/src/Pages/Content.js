import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "../styles/Content.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function Content() {
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
//   useEffect(() => {
//     checkSession();
//   }, []);
  const { post_id } = useParams();
  const [crntPost, setCrntPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${post_id}`)
      .then((response) => {
        // 요청이 성공하면 데이터를 상태(state)에 저장합니다.
        setCrntPost(response.data);
      })
      .catch((error) => {
        // 요청이 실패하면 에러를 처리합니다.
        console.error("GET 요청에 실패했습니다:", error);
      });
  }, []);

  const deletePost = async () => {
    checkSession();
    await axios
      .delete(`http://localhost:3000/api/posts/${post_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // 요청이 성공하면 해당 게시물을 삭제합니다.
        console.log(response.data);
        alert("삭제되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        // 요청이 실패하면 에러를 처리합니다.
        console.error("DELETE 요청에 실패했습니다:", error);
      });
  };

  function formatDate(inputDate) {
    const formattedDate = dayjs(inputDate).format("YY.MM.DD HH:mm");
    return formattedDate;
  }

  return (
    <>
      {crntPost ? (
        <>
          <Container>
            <p className="d-flex justify-content-end text-muted">
              🏠 ‣ Community ‣ 게시물 상세 페이지
            </p>
            <Card className="mt-0">
              <Card.Header className="pt-4">
                <h2 className="text-center my-5">{crntPost.title}</h2>
                <p>
                  <span>글쓴이: {crntPost.author} </span>
                  <span>조회수: {crntPost.view} </span>
                  <span>작성일: {formatDate(crntPost.createdAt)}</span>
                  <span>
                    카테고리:{" "}
                    {crntPost.category.map((e) => {
                      return (
                        <span key={e} className="badge bg-secondary ms-2">
                          {e}
                        </span>
                      );
                    })}
                  </span>
                </p>
              </Card.Header>
              <Card.Body>
                <Card.Text className="my-5">{crntPost.content}</Card.Text>
              </Card.Body>
            </Card>

            <Row className="mt-3">
              <Col xs={6} className="d-flex">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  목록보기
                </Button>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Link
                  to={`/edit/${crntPost.author}/${crntPost._id}`}
                  className="mx-1"
                >
                  <Button size="sm" variant="primary">
                    수정
                  </Button>
                </Link>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    deletePost(crntPost._id);
                  }}
                >
                  삭제
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default Content;
