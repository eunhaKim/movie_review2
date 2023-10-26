const Review = require('../models/reviewModel'); // Review 모델을 가져옵니다.

// 리뷰 생성 (Create)
// @end-point : host/api/reviews/
// @method : post
exports.createReview = async (req, res) => {
  // if(!req.session.user){
  //   res.status(401).json({error:"허가받지 않은 사용자입니다."});
  //   return;
  // }
  try {
    const { movie_id, content, author, rating } = req.body;
    const review = new Review({ movie_id, content, author, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: '리뷰를 생성하는 중에 오류가 발생했습니다.' });
  }
};

// 게시물 조회 (Read)
// @end-point : host/api/reviews/
// @method : get
exports.getAllReviews = async (req, res) => {
  try {
    const { page, perpage } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출

    const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
    const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)

    const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

    // 총 게시물 수를 가져옴
    const totalReviews = await Review.countDocuments();

    // 현재 페이지의 게시물을 가져옴
    const reviews = await Review.find()
      .sort({createdAt:-1})
      .skip(skip)
      .limit(itemsPerPage);

    res.status(200).json({
      reviews,
      currentPage,
      totalPages: Math.ceil(totalReviews / itemsPerPage)
    });
  } catch (error) {
    res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
  }
};


// 게시물 조회 (Read) by movie_id
// @end-point : host/api/reviews/by-movie_id/:movie_id
// @method : get
exports.getReviewsByMovie_id = async (req, res) => {
  try {
    const { page, perpage } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출

    const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
    const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)

    const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

    // 총 게시물 수를 가져옴
    const totalReviews = await Review.countDocuments();

    // 영화id 가져옴
    const movie_id = req.params.movie_id;

    const reviews = await Review.find({movie_id:movie_id})
      .sort({createdAt:-1})
      .skip(skip)
      .limit(itemsPerPage);

    res.status(200).json({
      reviews,
      currentPage,
      totalPages: Math.ceil(totalReviews / itemsPerPage)
    });    
  } catch (error) {
    res.status(500).json({ error: '리뷰를 조회하는 중에 오류가 발생했습니다.' });
  }
};