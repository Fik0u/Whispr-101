const express = require('express');

require('dotenv').config();

const connectDB = require('./config/connectDB');

const app = express();

// Middleware 
app.use(express.json());

// DB connection 
connectDB();

// Routes 
app.use('/api/auth', require('./routes/auth.routes'));



// Port 
const PORT = process.env.PORT || 1302

// Listen 
app.listen(PORT, (err) => {
    err ? console.error("Server couldn't run 👾", err)
    : console.log(`Server is running on port ${PORT} 🤖`)
});