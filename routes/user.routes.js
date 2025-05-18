
const express = require('express');

const router = express.Router();

const User = require('../model/User'); 

// Users List Route
router.get('/usersList', async (req, res) => {
  try {
    const users = await User.find().select('_id username avatar'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: "Couldn't get users list", error});
  }
});

// Search User Route
router.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ msg: 'No request' })
  }

  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i'}
    }).select('_id username avatar');
    res.status(200).json({ msg: 'Users found successfully', users })
  } catch (error) {
    res.status(400).json({ msg: "Couldn't get requested users"})
  }
});



module.exports = router;
