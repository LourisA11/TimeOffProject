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

async function editPost({ postId, title, content }) {
  if (!postId || !title || !content) {
    throw new Error("Missing post data");
  }

  let sql = `
    UPDATE Post
    SET Title = ?, Content = ?
    WHERE PostID = ?
  `;
  await con.query(sql, [title, content, postId]);
}

module.exports = { getPostsByUser, createPost, deletePost ,editPost };
