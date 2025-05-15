const express = require('express');
const { newGroup, addMember, getGroups } = require('../controllers/group.controller');

const router = express.Router();


// Test Route 
router.get('/test', (req, res) => {
    res.status(200).json('Group test route is functionnal ! 🫡')
});

// Create New Group Toute
router.post('/', newGroup);

// Add Member Route
router.post('/:groupId/members', addMember);

// Get User's Groups Route
router.get('/user/:userId', getGroups);


module.exports = router;