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

// PUT update a shift request
.put('/updateShiftRequest', async (req, res) => {
  try {
    const shift = await ShiftRequest.updateShiftRequest(req.body);
    res.send({ message: "Shift request updated successfully", shift });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// DELETE a shift request
.delete('/deleteShiftRequest', async (req, res) => {
  try {
    await ShiftRequest.deleteShiftRequest(req.body);
    res.send({ success: "Shift request deleted successfully" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})


module.exports = router;
