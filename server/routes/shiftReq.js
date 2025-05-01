const express = require("express");
const ShiftRequest = require("../models/shiftReq"); // Import your shift model
const router = express.Router();

router

// GET all shift requests
.get('/getShiftRequests', async (req, res) => {
  try {
    const shifts = await ShiftRequest.getAllShiftRequests();
    res.send(shifts);
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})

// POST a new shift request
.post('/createShiftRequest', async (req, res) => {
  try {
    await ShiftRequest.createShiftRequest(req.body);
    res.send({message: "Shift request created successfully"});
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})

module.exports = router;
