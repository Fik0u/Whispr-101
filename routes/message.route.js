const express = require('express');
const { getMessages, createMessage } = require('../controllers/message.controller');

const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.json('Message Test Route is working !!')
});

// History Chat Between Users Route
router.get('/:userId/:otherUserId', getMessages);

//Send New Message Route
router.post('/', createMessage);



module.exports = router;