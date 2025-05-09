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


router.delete('/deletePost', async (req, res) => {
    try {
      const postID = req.params.postID;
      if (!postID) throw new Error("Missing postID");
  
      await Post.deletePost(postID);
      res.send({ success: "Post deleted successfully" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
});



module.exports = router;
