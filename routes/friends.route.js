const express = require('express');
const isAuth = require('../middleware/isAuth');
const { sendFriendRequest, respondFriendRequest } = require('../controllers/friends.controller');

const router = express.Router();

// Test Route 
router.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Friends Route is functionnal 😁'})
});

// Send Request Route
router.post('/send', isAuth, sendFriendRequest);

// Respond Request
router.post('/respond', isAuth, respondFriendRequest);


module.exports = router;