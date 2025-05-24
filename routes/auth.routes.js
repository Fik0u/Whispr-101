const express = require('express');
const { register, login, updateProfile } = require('../controllers/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/upload');


const router = express.Router();

// Test route 
router.get('/test', (req, res) => {
    res.json('Auth test route is working 😃')
});

// Register route
router.post('/register', registerValidation(), validate, register);

//Login route
router.post('/login', loginValidation(), validate, login);

//Current user route
router.get('/current', isAuth, (req, res) => {
    res.json(req.user);
});

//Update Profile Route
router.put('/update', isAuth, upload.single('avatar'), updateProfile);


module.exports = router;