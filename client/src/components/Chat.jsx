import React, { useEffect, useState } from 'react';
import axios from 'axios'
import socket from '../socket';

const Chat = ({ currentUser }) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (currentUser) {
            socket.emit('addUser', { 
                userId: currentUser._id,
                username: currentUser.username
            });
        };
        socket.on('getUsers', (users) => {
            setOnlineUsers(users)
        });
        socket.on('getMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        });
        return () => {
            socket.off('getUsers');
            socket.off('getMessage');
        };
    }, [currentUser]);

    useEffect(() => {
        const foundMessages = async () => {
            if (!receiverId || receiverId === currentUser._id) return;

            if (receiverId) {
                try {
                    const result = await axios.get(`/api/messages/${currentUser._id}/${receiverId}`);
                    setMessages(result.data);
                } catch (error) {
                    console.error("Couldn't fetch messages", error)
                }
            }
        };
        foundMessages()
    }, [receiverId, currentUser._id]);

    const sendMessage = async () => {
        if (message && receiverId) {
            socket.emit('sendMessage', {
                senderId: currentUser._id,
                receiverId, 
                text: message
            });

            try {
                await axios.post('/api/messages', {
                    senderId: currentUser._id,
                    receiverId,
                    text: message
                })
            } catch (error) {
                console.error("Couldn't send message", error)
            }
            setMessage('')
        }
    };

  return (
    <div>
      <div>
        <h3>Online Users</h3>
        {onlineUsers
        .filter(user => user.userId !== currentUser._id)
        .map((user) => (
            <div key={`${user.userId}-${user.socketId}`} onClick={() => setReceiverId(user.userId)}>
                {user.username} 
                {user.userId === receiverId && '✅'}
            </div>
        ))}
      </div>

      <div>
        <h3>Messages</h3>
        {messages.map((msg, index) => (
            <div key={index}>
                <strong>
                    {msg.senderId === currentUser._id 
                        ? 'You' 
                        : (onlineUsers.find(u => u.userId === msg.senderId)?.username || msg.senderId)}: </strong>
                {msg.text}
            </div>
        ))}
      </div>
      <input 
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message' />
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat
