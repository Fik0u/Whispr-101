// Necessary Imports
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../model/User");
const uploadToCloudinary = require("../utils/cloudinaryUpload");



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

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const { username, bio, status } = req.body;
        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (status) user.status = status;

        if (req.file) {
            const avatarURL = await uploadToCloudinary(req.file.path);
            user.avatar = avatarURL;
        }

        await user.save();

        res.status(200).json({ msg: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ 
            msg: 'Error while updating profile', 
            error: error.message || error.toString() 
        });
    }
};
