const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Post (
    PostID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    Title VARCHAR(255),
    Content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(PostID)
  );`
  await con.query(sql)
}
createTable()



async function getPostsByUser(userId) {
  let sql = `SELECT * FROM Post WHERE UserID = ${userId} ORDER BY created_at DESC`;
  return await con.query(sql)
}

async function createPost(post) {
  if (!post.userId || !post.title || !post.content) {
    throw new Error("Missing required fields (userId, title, content)");
  }

  let sql = `
    INSERT INTO Post (UserID, Title, Content)
    VALUES (${post.userId}, "${post.title}", "${post.content}")
  `;
  await con.query(sql);
  return { success: "Post created successfully" };
}



async function deletePost(postID) {
  if (!postID) throw new Error("Missing postId");

  let sql = `DELETE FROM Post WHERE PostID = ${postID}`;
  await con.query(sql);
  return { message: "Post deleted successfully" };
}

async function editPost(postID, post) {
  if (!postID || !post.title || !post.content) {
    throw new Error("Missing required fields (postId, title, content)");
  }

  let sql = `
    UPDATE Post
    SET Title = "${post.title}", Content = "${post.content}"
    WHERE PostID = ${postID}
  `;
  await con.query(sql);
  return { success: "Post updated successfully" };
}

module.exports = { getPostsByUser, createPost, deletePost ,editPost };
