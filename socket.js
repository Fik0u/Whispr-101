let onlineUsers = [];
const Message = require('./model/Message');

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

        socket.on('joinGroup', (groupId) => {
            console.log(`Socket ${socket.id} joined the group ${groupId}`);
            socket.join(groupId)
        });

        socket.on('sendGroupMessage', async ({ groupId, senderId, text}) => {
            try {
                const newMessage = await Message.create({
                    group: groupId, sender: senderId, text, timestamp: new Date()
                });
                const populatedMessage = await newMessage.populate('sender', 'username avatar')

                io.to(groupId).emit('getGroupMessage', populatedMessage)
            } catch (error) {
                console.error('Error while sending group message', error)
            }
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

