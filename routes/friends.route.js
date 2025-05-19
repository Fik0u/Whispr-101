const express = require('express');
const isAuth = require('../middleware/isAuth');
const { sendFriendRequest, respondFriendRequest, getFriendRequests, getFriends } = require('../controllers/friends.controller');

const router = express.Router();

// Test Route 
router.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Friends Route is functionnal 😁'})
});

// Send Request Route
router.post('/send', isAuth, sendFriendRequest);

// Friends Requests List Route
router.get('/requests', isAuth, getFriendRequests);

// Respond Request
router.post('/respond', isAuth, respondFriendRequest);

// Friends List Route
router.get('/:userId/friends', isAuth, getFriends);


module.exports = router;