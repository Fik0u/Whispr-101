// Necessary Imports
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../model/User");



// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Existing user verification
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({errors: [{ msg: 'User already exists' }]})
        }
        // Hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashPassword });

        await newUser.save();

        //Token generation
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {expiresIn: '24h'});

        res.status(201).json({ msg: 'User registered successfully', user: newUser, token })
    } catch (error) {
        res.status(400).json({errors: [{ msg: 'Registration failed'}], error: error.message })
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email })

        // Existing email
        if (!foundUser) {
            return res.status(400).json({ msg: 'Invalid email or password' })
        }

        // Password matching
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' })
        }

        // Token attribution
        const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, {expiresIn : '24h'});

        res.status(200).json({ msg: 'User logged in successfully', user: foundUser, token })
    } catch (error) {
        res.status(400).json({ msg: 'Login failed', error })
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const authUserId = req.user._id.toString();
        if (userId !== authUserId) {
            return res.status(403).json({ msg: 'Unauthorized'})
        }
        const { username, bio, status } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId, {username, bio, status }, { new: true }
        ).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(200).json({ msg: 'User profile updated successfully ', updatedUser})
    } catch (error) {
        res.status(400).json({ msg: 'Error while updating profile'})
    }
};