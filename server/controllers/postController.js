const Post = require('../models/postModel'); // Post 모델을 가져옵니다.

// 게시물 생성 (Create)
// @end-point : host/api/posts/
// @method : post
exports.createPost = async (req, res) => {
  if(!req.session.user){
    res.status(401).json({error:"허가받지 않은 사용자입니다."});
    return;
  }
  try {
    const { title, content, author, category } = req.body;
    const post = new Post({ title, content, author, category });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: '게시물을 생성하는 중에 오류가 발생했습니다.' });
  }
};


// 게시물 조회 (Read)
// @end-point : host/api/posts/
// @method : get
exports.getAllPosts = async (req, res) => {
  try {
    const { page, perpage } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출

    const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
    const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)

    const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

    // 총 게시물 수를 가져옴
    const totalPosts = await Post.countDocuments();

    // 현재 페이지의 게시물을 가져옴
    const posts = await Post.find()
      .sort({createdAt:-1})
      .skip(skip)
      .limit(itemsPerPage);

    res.status(200).json({
      posts,
      currentPage,
      totalPages: Math.ceil(totalPosts / itemsPerPage),
    });
  } catch (error) {
    res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
  }
};

// 게시물 조회 (Read) by user_ID
// @end-point : host/api/posts/:id
// @method : get
exports.getPostByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
    }

    // 조회수 1 증가
    post.view += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
  }
};

// 게시물 조회 (Read) by 카테고리
// @end-point : host/api/posts/by-category/:category
// @method : get
exports.getPostsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const post = await Post.find({category:category});

    if (!post) {
      return res.status(404).json({ error: '해당 카테고리의 게시물을 찾을 수 없습니다.' });
    }
    res.status(200).json(post);     
  } catch (error) {
    res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
  }
};

// 게시물 조회 (Read) by user_id
// @end-point : host/api/posts/by-author/:id
// @method : get
exports.getPostByAuthorId = async (req, res) => {
  try {
    const authorId = req.params.id;
    const post = await Post.find({author:authorId});

    if (!post) {
      return res.status(404).json({ error: '해당 유저의 게시물을 찾을 수 없습니다.' });
    }
    res.status(200).json(post);     
  } catch (error) {
    res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
  }
};



// 게시물 수정 (Update)
// @end-point : host/api/posts/:id
// @method : put
  exports.updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content,category } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(postId, { title, content, category }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: '게시물을 수정하는 중에 오류가 발생했습니다.' });
    }
  };

// 게시물 삭제 (Delete)
// @end-point : host/api/posts/:id
// @method : delete
exports.deletePost = async (req, res) => {
  if(!req.session.user){
    res.status(401).json({error:"허가받지 않은 사용자입니다."});
    return;
  }
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '게시물을 삭제하는 중에 오류가 발생했습니다.' });
  }
};