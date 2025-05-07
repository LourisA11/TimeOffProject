import { fetchData } from "./main.js"
let loginForm = document.getElementById('loginForm')
if(loginForm) loginForm.addEventListener('submit', login)

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
      Username: username,
      Password: password
    }

    fetchData('/users/login', user, "POST")
    .then(data => {
      if(!data.message) {
        setCurrentUser(data)
        window.location.href = "index.html"
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
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");

  const username = usernameInput?.value?.trim() ?? "";
  const password = passwordInput?.value?.trim() ?? "";
  const email = emailInput?.value?.trim() ?? "";
  const firstName = firstNameInput?.value?.trim() ?? "";
  const lastName = lastNameInput?.value?.trim() ?? "";


  if (!username) {
    errorSection.innerText = "Username cannot be blank!";
    return;
  }
    if (!password) {
        errorSection.innerText = "Password cannot be blank!";
        return;
    }
    if (!email) {
        errorSection.innerText = "Email cannot be blank!";
        return;
    }
    if (!firstName) {
        errorSection.innerText = "First name cannot be blank!";
        return;
    }
    if (!lastName) {
        errorSection.innerText = "Last name cannot be blank!";
        return;
    }
    errorSection.innerText = ""; // Clear any previous error messages

  const user = {
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName
  };


  fetchData("/users/register", user, "POST")
  .then(data => {
    if(!data.message) {
      setCurrentUser(data)
      window.location.href = "/login.html"
    }
  })
  .catch(err => {
    errorSection.innerText = `${err.message}`
  })
}  

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
  window.location.href = "/login.html"
}