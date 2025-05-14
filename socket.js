let onlineUsers = [];

const addUser = (userId, username, socketId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
        onlineUsers.push({ userId, username, socketId })
    }
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
};

const getUser = (userId) => {
    return onlineUsers.find(user => user.userId === userId)
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('🟢 New user connected :', socket.id);

        socket.on('addUser', ({ userId, username }) => {
            addUser(userId, username, socket.id);
            io.emit('getUsers', onlineUsers)
        });

        socket.on('sendMessage', ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit('getMessage', {
                    senderId, text
                })
            }
        });

        socket.on('disconnect', () => {
            console.log('🔴 User disconnected :', socket.id);
            removeUser(socket.id);
            io.emit('getUsers', onlineUsers);
        });
    });
};

