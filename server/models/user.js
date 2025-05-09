const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS User (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(255) NOT NULL UNIQUE,
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(userID)
    );`
  await con.query(sql)
}
createTable()

// CRUD Operations
async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}


async function login(user) {
  let cUser = await userExists(user.username)
  if(!cUser[0]) throw Error("Username does not exist!")
  if(cUser[0].password!=user.Password) throw Error("Password is incorrect!")
    
  return cUser[0]
}

async function userExists(username) {
  let sql = `
    SELECT * FROM User
    WHERE Username="${username}"
  `
  return await con.query(sql)
}

// CREATE in CRUD - Registering a user
async function register(user) {
  const cUser = await userExists(user.username)
  if(cUser.length > 0) throw Error("Username already in use!")

  let sql = `
    INSERT INTO User(password, username, email, firstName, lastName)
    VALUES("${user.password}", "${user.username}", "${user.email}", "${user.firstName}", "${user.lastName}")
  `
  const result = await con.query(sql);
  let newUser = await con.query(`SELECT * FROM User WHERE UserID = ${result.insertId}`);
  return newUser[0];
}


async function editUsername(user) {
  if (user.userId == null || user.username == null) {
    throw new Error("Missing userId or username");
  }

  let sql = `
    UPDATE User
    SET UserName = "${user.username}"
    WHERE UserID = ${user.userId}
  `;
  const result = await con.query(sql);
  if (result.affectedRows === 0) {
    throw new Error("User not found or username not updated.");
  }
  const updatedUser = await con.query(`SELECT * FROM User WHERE UserID = ${user.userId}`);
  return updatedUser[0];
}

async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${user.userId}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, editUsername, deleteAccount }