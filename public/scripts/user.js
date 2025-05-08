import { fetchData } from "./main.js"

// window.alert("Welcome to Class!!!! :)")


let loginForm = document.getElementById('loginForm')
if(loginForm) loginForm.addEventListener('submit', login)

// local storage functions
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}
// example accessing userId for second entity
// let currentUser = getCurrentUser()
// let userId = currentUser.userId

export function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location.href = "login.html"
}


function login(e) {
  e.preventDefault()
  let errorSection = document.getElementById("error")

  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  if(validString(username)) {
    errorSection.innerText = `Username cannot be blank!!!`
  } else {
    errorSection.innerText = ""  

    const user = {
      username: username,
      password: password
    }

    fetchData('/users/login', user, "POST")
    .then(data => {
      if(!data.message) {
        setCurrentUser(data)
        window.location.href = "post.html"
      }
    })
    .catch(err => {
      errorSection.innerText = `${err.message}`
    })
    console.log(user)
  }
  document.getElementById('username').value = ""
  document.getElementById('password').value = ""

}

function validString(word) {
  return word == ""
}

// register form code
let registerForm = document.getElementById("registerForm")
if(registerForm) registerForm.addEventListener('submit', register)

function register(e) {
  e.preventDefault() 

  let errorSection = document.getElementById("error")

  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value
  }

  fetchData("/users/register", user, "POST")
  .then(data => {
    if(!data.message) {
      setCurrentUser(data)
      window.location.href = "home.html";
    }
  })
  .catch(err => {
    errorSection.innerText = `${err.message}`
  })
}  

