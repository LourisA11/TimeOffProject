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
          <button class="edit-post" data-id="${post.PostID}">Edit</button>
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
      document.querySelectorAll(".edit-post").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const postId = e.target.dataset.id;
          showEditForm(postId);
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

function deletePost(postId) {
  fetch(`http://localhost:3000/posts/deletePost/${postId}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();  
    })
    .then(data => {
      console.log("Deleted successfully:", data);
      loadAllPosts();
    })
    .catch(err => {
      console.error("Error deleting:", err);
      document.getElementById("message").innerText = err.message;
    });
}



function editPost(postID) {
  const postTitle = document.getElementById("title").value;
  const postContent = document.getElementById("content").value;

  if (validString(postTitle) || validString(postContent)) {
    alert("Title or Content cannot be blank.");
  } else {
    const post = {
      title: postTitle,
      content: postContent
    };

    fetch(`http://localhost:3000/posts/editPost/${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          loadAllPosts();
        } else {
          alert("Edit failed");
        }
      })
      .catch(err => {
        console.error("Error editing:", err);
        alert(err.message);
      });
  }
}

function showEditForm(postId) {
  const postCard = document.querySelector(`[data-id="${postId}"]`).closest(".post-card");
  const title = postCard.querySelector("h3").innerText;
  const content = postCard.querySelector("p:nth-of-type(2)").innerText;

  document.getElementById("editTitle").value = title;
  document.getElementById("editContent").value = content;
  document.getElementById("editModal").style.display = "block";

  document.getElementById("saveEdit").onclick = () => {
    const newTitle = document.getElementById("editTitle").value;
    const newContent = document.getElementById("editContent").value;

    fetch(`http://localhost:3000/posts/editPost/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(() => {
        document.getElementById("editModal").style.display = "none";
        loadAllPosts();
      })
      .catch(err => alert("Edit failed: " + err.message));
  };
}
