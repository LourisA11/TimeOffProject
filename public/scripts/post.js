import { getCurrentUser } from "./user.js"
import { fetchData } from "./main.js"


const user = getCurrentUser();
if (!user) window.location.href = "login.html";

window.addEventListener("DOMContentLoaded", () => {
  loadAllPosts();
});

let loginForm = document.getElementById('postForm')
if(loginForm) loginForm.addEventListener('submit', Post);
  loadAllPosts();

function Post(e) {

  e.preventDefault(e)

  let errorSection = document.getElementById("error")
  let title = document.getElementById('title').value
  let content = document.getElementById('content').value

  if (validString(title) || validString(content)) {
    errorSection.innerText = `Title or Content cannot be blank.`
  } else {
    errorSection.innerText = "" ;
  
  const post = {
    userId: user.UserID,
    title: title,
    content: content
  }
  fetchData('/posts/createPost', post, "POST")
    .then(data => {
      if (data.message) {
        document.getElementById("message").innerHTML = "You successfully added a post!";
        document.getElementById("postForm").reset();
        addPostToPage(post);
      }
    })
    .catch(err => {
      errorSection.innerText = `${err.message}`;
    })
  console.log(post)
}
  document.getElementById('title').value = ""
  document.getElementById('content').value = ""
}
function validString(word) {
  return word == ""
}

function loadAllPosts() {
  fetch("http://localhost:3000/posts/getPosts")
    .then(response => response.json())
    .then(posts => {
      if (!Array.isArray(posts)) {
        console.error("Expected array but got:", posts);
        document.getElementById("message")="";
        return;
      }

      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = "";

      posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.innerHTML = `
          <h3>${post.Title}</h3>
          <p>${post.Content}</p>
          <p>Posted on ${new Date(post.created_at).toLocaleString()}</p>
        `;
        postsDiv.appendChild(postEl);
      });
    })
    .catch(err => {
      document.getElementById("message").innerText = "Failed to load posts.";
      console.error(err);
    });
}
function addPostToPage(post) {
  const postsDiv = document.getElementById("posts");
  const postEl = document.createElement("div");
  postEl.classList.add("post");
  postEl.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <p><small>Posted just now</small></p>
  `;
  postsDiv.prepend(postEl);
}




