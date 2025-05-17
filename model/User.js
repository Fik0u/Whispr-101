const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: 'https://refugedulacdulou.com/wp-content/uploads/2019/01/avatar-anonyme.png'
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, { timestamps : true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;