const con = require("./db_connect");

async function createShiftRequestTable() {
  let sql = `CREATE TABLE IF NOT EXISTS ShiftRequest (
    RequestID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    ShiftDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Location VARCHAR(255),
    Status ENUM('PENDING', 'APPROVED', 'DECLINED') DEFAULT 'PENDING',
    CONSTRAINT shiftRequestPK PRIMARY KEY(RequestID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
  );`
  await con.query(sql);
}
createShiftRequestTable();

// CRUD Operations for ShiftRequest
async function getAllShiftRequests() {
  let sql = `SELECT * FROM ShiftRequest`;
  return await con.query(sql);
}

async function createShiftRequest(shift) {
  let sql = `
    INSERT INTO ShiftRequest (UserID, ShiftDate, StartTime, EndTime, Location)
    VALUES (${shift.UserID}, '${shift.ShiftDate}', '${shift.StartTime}', '${shift.EndTime}', '${shift.Location}')
  `;
  await con.query(sql);
}

module.exports = { getAllShiftRequests, createShiftRequest };
