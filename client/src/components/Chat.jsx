import React, { useEffect, useState } from 'react';
import socket from '../socket';

const Chat = ({ currentUser }) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (currentUser) {
            socket.emit('addUser', currentUser._id);
        };
        socket.on('getUsers', (users) => {
            setOnlineUsers(users)
        });
        socket.on('getMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        });
        return () => {
            socket.off('getUsers');
            socket.off('getMessage')
        };
    }, [currentUser]);

    const sendMessage = () => {
        if (message && receiverId) {
            socket.emit('sendMessage', {
                senderId: currentUser._id,
                receiverId, 
                text: message
            });
            setMessages((prevMessages) => [...prevMessages, { senderId: currentUser._id, text: message }]);
            setMessage('')
        }
    };

  return (
    <div>
      <div>
        <h3>Online Users</h3>
        {onlineUsers.map((user) => (
            <div key={`${user.userId}-${user.socketId}`} onClick={() => setReceiverId(user.userId)}>
                {user.userId} 
                {user.userId === receiverId && '✅'}
            </div>
        ))}
      </div>
      <div>
        <h3>Messages</h3>
        {messages.map((msg, index) => (
            <div key={index}>
                <strong>{msg.senderId === currentUser._id ? 'You' : msg.senderId}: </strong>
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
