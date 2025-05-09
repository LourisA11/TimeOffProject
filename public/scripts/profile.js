import { getCurrentUser, removeCurrentUser, setCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()
if(!user) window.location.href = "index.html"

let errorSection = document.querySelector(".error");
const profile = document.getElementById("profile")

profile.innerHTML+= `
   <h1>Welcome ${user.UserName}!</h1>
   <button id="deleteAccount">Delete Account</button>
`

const deleteUser = document.getElementById("deleteAccount")
deleteUser.addEventListener('click', deleteAccount)

function deleteAccount() {
  if(confirm("Are you sure you want to leave me?? :(( PLease NOOOOOOOOOOO!!!!!!!!!!!")) {
    fetchData('/users/deleteAccount', { userId: user.UserID }, "DELETE")
    .then(data => {
      if(!data.message) {
        removeCurrentUser()
        window.location.href = "home.html"
      }
    })
    .catch(err => {
      errorSection.innerText = `${err.message}`;
    });
  }
}

// edit username functionality
const editForm = document.getElementById("editForm")
if(editForm) editForm.addEventListener('submit', editUsername)

document.getElementById("username").placeholder = user.UserName;

function editUsername(e) {
  e.preventDefault()
 const newUsername =  document.getElementById("username").value ;

 if (!newUsername) {
    errorSection.innerText = "Username cannot be blank.";
    return;
  }
  const updatedUser = {
    userId:  parseInt(user.UserID),
    username: newUsername
  };
  fetchData('/users/update', updatedUser, "PUT")
  .then(data => {
       if (data.UserID) {
        setCurrentUser(data);
        window.location.reload();
        document.getElementById("welcome").innerText = `Welcome ${data.UserName}!`;

        errorSection.innerText = " Username updated!";
      } else {
        errorSection.innerText = "Error updating username.";
      }
    })
    .catch(err => {
      errorSection.innerText = `${err.message}`;
  });
}  