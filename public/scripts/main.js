import { getCurrentUser,removeCurrentUser } from "./user.js";
const nav= document.querySelector('.topnav')
const user = getCurrentUser();
if(getCurrentUser()){
  nav.innerHTML=`
   <ul>
    <a href="home.html">Home</a>
    <a href="post.html">Create Post</a>
    <a href="#" id="logout">Logout</a>
   </ul>`

}else{
  nav.innerHTML=`
   <ul>
    <a href="home.html">Home</a>
    <a href="register.html">Register Account</a>
    <a href="login.html">Login</a>
    </ul>`
}


const logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}



// // Login function

// let loginForm = document.getElementById("loginForm");
// loginForm.addEventListener('submit', login)

//     function login(e) {
//       e.preventDefault()
//       let errorSection = document.getElementById("error")
    
//       let username = document.getElementById('username').value
//       let password = document.getElementById('password').value
    
//       if(validString(username)) {
//         errorSection.innerText = `Username cannot be blank!!!`
//       } else {
//         errorSection.innerText = ""  
//         console.log(username)
    
//         const user = {
//           userName: username,
//           passwd: password
//         }
      
//         let section = document.getElementById("welcome")
//         section.innerHTML = `Welcome, ${username}!`
      
//         console.log(user)
//       }
//       document.getElementById('username').value = ""
//       document.getElementById('password').value = ""
    
//     }
    
//     function validString(word) {
//       return word == ""
//     }

// // Register function

//     let registerForm = document.getElementById("registerForm");
//     registerForm.addEventListener("submit", register)

// function register(e){
//     e.preventDefault();

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const email = document.getElementById('email').value;
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const userId = Math.floor(Math.random() * 1000); // Generate a random userId
//     const newUser = new User(userId, username, email, password, firstName, lastName);

//     console.log("New User Created:", newUser);
//     alert(`User ${username} registered successfully!`);

//     registerForm.reset(); 
// }


// class Post{
//   constructor(postId, title, content){
//     this.postId=postId;
//     this.title=title;
//     this.content=content;
//   }

//   getPostId(){
//     return this.postId;
//   }
//   setPostId(postId){
//     this.postId=postId;
//   } 

//   getTitle(){
//     return this.title;
//   }
//   setTitle(title){
//     this.title=title;
//   }

//   getContent(){
//     return this.content;
//   }
//   setContent(content){
//     this.content=content;
//   }
// }

//   const posts = [
//     {
//       postId: 123, 
//       title: "Post 1",
//       content: "This is the content of post 1"
//     },
//     {
//       postId: 456,
//       title: "Post 2",
//       content: "This is the content of post 2"
//     }
// ];
// posts.forEach(function(posts) {
//   console.log(posts.postId + " : " + posts.title + " : " + posts.content);
// }
// )

// //Post 
// let postForm = document.getElementById("postForm");
// postForm.addEventListener("submit", post)

// function post(e){
//     e.preventDefault();

//     const postTitle = document.getElementById('postTitle').value;
//     const postContent = document.getElementById('postContent').value;
//     const postId = Math.floor(Math.random() * 1000); // Generate a random postId
//     const newPost = {
//         postId: postId,
//         title: postTitle,
//         content: postContent
//     };

//     console.log("New Post Created:", newPost);
//     alert(`Post "${postTitle}" created successfully!`);

//     postForm.reset(); 
// }

