const {check, validationResult} = require('express-validator');

//Registration validation
exports.registerValidation = () => [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({min: 6})
];

//Login validation
exports.loginValidation = () => [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({min: 6})
];

// Validate middleware
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({errors : errors.array()})
};
