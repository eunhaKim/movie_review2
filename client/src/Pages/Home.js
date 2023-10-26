import React from "react";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <section id="hero" class="d-flex align-items-center">
        <div class="container">
          <h1>Welcome to Movie Review<i>!</i></h1>
          <h2>
            영화 상세정보와 리뷰, 커뮤니티의 모든것 :)
          </h2>
          <a href="#about" class="btn-get-started scrollto">
            About Company
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
