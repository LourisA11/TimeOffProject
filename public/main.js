console.log("Login.js loaded!");

// loginForm.addEventListener('submit', function(event) {
//   event.preventDefault(); 
//   const username = document.getElementById('username').value.trim();
//   console.log('Username:', username);

//   alert(`Welcome, ${username}!`);

// });

// function User(username, password ){
  
}

class User{ 
  constructor(userId, username, email, password, firstName,lastName){
    this.userId=userId;
    this.userName = username;
    this.email=email;
    this.firstName=firstName; 
    this.lastName=lastName;
    this.password=password;
  }

  getUserId(){
    return this.userId;
  }
  setUserId(userId){
    this.userId=userId;
  } 

  getUserName(){
    return this.userName;
  }
  setUserName(userName){
    this.userName=userName;
  }

  getEmail(){
    return this.email;
  }
  setEmail(email){
    this.email=email;
  }
  getFirstName(){
    return this.firstName;
  }
  setFirstName(firstName){
    this.firstName=firstName;
  }

  getLastName(){
    return this.lastName;
  }
  setLastName(lastName){
    this.lastName=lastName;
  }
  getPassword(){
    return this.password;
  }
  setPassword(password){
    this.password=password;
  }

}

      const users = [
        {
          userId: 123, 
          username: "lalala",
          firstName: "La",
          lastName: "al",
          email: "la@al",
          password: "cat"
        },
        {
          userId: 456,
          username: "rarara",
          firstName: "ra",
          lastName: "ar",
          email: "ra@ar",
          password: "dog"
        }

      ];

      users.forEach(function(users) {
        console.log(users.username + " : " + users.email + " : " + users.fName + " " + users.lName);
    })

// Login function

let loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit', login)

    function login(e) {
      e.preventDefault()
      let errorSection = document.getElementById("error")
    
      let username = document.getElementById('username').value
      let password = document.getElementById('password').value
    
      if(validString(username)) {
        errorSection.innerText = `Username cannot be blank!!!`
      } else {
        errorSection.innerText = ""  
        console.log(username)
    
        const user = {
          userName: username,
          passwd: password
        }
      
        let section = document.getElementById("welcome")
        section.innerHTML = `Welcome, ${username}!`
      
        console.log(user)
      }
      document.getElementById('username').value = ""
      document.getElementById('password').value = ""
    
    }
    
    function validString(word) {
      return word == ""
    }

// Register function

    let registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", register)

function register(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userId = Math.floor(Math.random() * 1000); // Generate a random userId
    const newUser = new User(userId, username, email, password, firstName, lastName);

    console.log("New User Created:", newUser);
    alert(`User ${username} registered successfully!`);

    registerForm.reset(); 
}


class Post{
  constructor(postId, title, content){
    this.postId=postId;
    this.title=title;
    this.content=content;
  }

  getPostId(){
    return this.postId;
  }
  setPostId(postId){
    this.postId=postId;
  } 

  getTitle(){
    return this.title;
  }
  setTitle(title){
    this.title=title;
  }

  getContent(){
    return this.content;
  }
  setContent(content){
    this.content=content;
  }
}

  const posts = [
    {
      postId: 123, 
      title: "Post 1",
      content: "This is the content of post 1"
    },
    {
      postId: 456,
      title: "Post 2",
      content: "This is the content of post 2"
    }
];
posts.forEach(function(posts) {
  console.log(posts.postId + " : " + posts.title + " : " + posts.content);
}
)

//Post 
let postForm = document.getElementById("postForm");
postForm.addEventListener("submit", post)

function post(e){
    e.preventDefault();

    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    const postId = Math.floor(Math.random() * 1000); // Generate a random postId
    const newPost = {
        postId: postId,
        title: postTitle,
        content: postContent
    };

    console.log("New Post Created:", newPost);
    alert(`Post "${postTitle}" created successfully!`);

    postForm.reset(); 
}

