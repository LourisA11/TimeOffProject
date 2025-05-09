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
        loadAllPosts();
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
  fetch(`http://localhost:3000/posts/${user.UserID}`)
    .then(response => response.json())
    .then(posts => {
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = ""; // clear previous

      posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.innerHTML = `
          <div class="post-card">
             <p><strong>Post ID:</strong> ${post.PostID}</p>
          <h3>${post.Title}</h3>
          <p>${post.Content}</p>
          <button class="delete-post" data-id="${post.PostID}">Delete</button>
          </div>
        `;
        postsDiv.appendChild(postEl);
      });
      document.querySelectorAll(".delete-post").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const postId = e.target.dataset.id;
          deletePost(postId);
        });
      });

    })
    .catch(err => {
      document.getElementById("message").innerText = `Failed to load posts. ${err.message}`;
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

function deletePost(postID) {
  if (confirm("Delete this post?")) {
    fetch(`http://localhost:3000/posts/deletePost/${postID}`, {
      method: "DELETE"
    })

    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
  })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          loadAllPosts();
        } else {
          alert("Delete failed");
        }
      })
      .catch (err=>{
        console.error("Error deleting:", err);
    alert(err.message);
       })
  }


}
