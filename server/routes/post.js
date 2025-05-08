const express = require("express");
const Post = require("../models/post"); 
const router = express.Router();




router.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.send(posts);
  } catch(err) {
    res.status(500).send({message: err.message});
  }
})

router.get('/:userId', async (req, res) => {
    try {
      const posts = await Post.getPostsByUser(req.params.userId);
      res.send(posts);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });


router.post('/createPost', async (req, res) => {
  try {
    await Post.createPost(req.body);
    res.send({ message: "Post created successfully" });
  

  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});






module.exports = router;
