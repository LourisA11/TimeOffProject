const express = require("express");
const Post = require("../models/post"); 
const router = express.Router();




router.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.getPostsByUser();
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


//delpost
//edpost 


router.delete('/deletePost/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    if (!postId) throw new Error("Missing postId");

    await Post.deletePost(postId);  // Make sure this works in your model
    res.send({ success: "Post deleted successfully" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

router.put('/editPost/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const { title, content } = req.body;

    if (!postId || !title || !content) {
      throw new Error("Missing required fields: postId, title, or content.");
    }

    await Post.editPost({ postId, title, content });
    res.send({ message: "Post updated successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
