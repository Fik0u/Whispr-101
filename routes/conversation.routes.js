const express = require('express');
const { createConversation, getConversations } = require('../controllers/conversation.controller');

const router = express.Router();

// Conversation Test Route
router.get('/test', (req, res) => {
    res.json('Conversation test route is working...🫡')
});

// Create Conversation Route
router.post('/create', createConversation);

// Get user's conversations
router.get('/:userId', getConversations);


module.exports = router;