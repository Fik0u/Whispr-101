const express = require('express');
const path = require('path');

const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const connectDB = require('./config/connectDB');

const socketHandler = require('./socket');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

socketHandler(io);

// Middleware 
app.use(express.json());

// DB connection 
connectDB();

// Routes 
app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/users', require('./routes/user.routes'));

app.use('/api/friends', require('./routes/friends.route'))

app.use('/api/messages', require('./routes/message.route'));

app.use('/api/groups', require('./routes/group.routes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Port 
const PORT = process.env.PORT || 1302

// Listen 
server.listen(PORT, (err) => {
    err ? console.error("Server couldn't run 👾", err)
    : console.log(`Server is running on port ${PORT} 🤖 with WebSocket`)
});