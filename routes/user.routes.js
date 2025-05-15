
const express = require('express');

const router = express.Router();

const User = require('../model/User'); 


router.get('/usersList', async (req, res) => {
  try {
    const users = await User.find().select('_id username avatar'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: "Couldn't get users list", error});
  }
});

module.exports = router;
