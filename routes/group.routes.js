const express = require('express');
const { newGroup, addMember, getGroups, sendGroupMessage, getGroupMessages, removeMember, deleteGroup } = require('../controllers/group.controller');
const isAuth = require('../middleware/isAuth');


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

// Remove User Route
router.post('/:groupId/removeMember', removeMember);

// Send Group Message Route
router.post('/:groupId/messages', sendGroupMessage);

// Get Group Messages Route
router.get('/:groupId/messages', getGroupMessages);

// Delete Group Route
router.delete('/:id', isAuth, deleteGroup)


module.exports = router;