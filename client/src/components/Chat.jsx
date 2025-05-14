import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import socket from '../socket';

const Chat = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      socket.emit('addUser', {
        userId: currentUser._id,
        username: currentUser.username
      });
    }

    socket.on('getUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('getMessage', (data) => {
        if (!data.sender || !data.sender._id) {
    data.sender = {
      _id: data.senderId || 'unknown',
      username: 'Unknown',
      avatar: '/default-avatar.png'
    };
  }
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('getUsers');
      socket.off('getMessage');
    };
  }, [currentUser]);

  useEffect(() => {
    const foundMessages = async () => {
      if (!receiverId || receiverId === currentUser._id) return;

      try {
        const res = await axios.get(`/api/messages/${currentUser._id}/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Couldn't fetch messages", err);
      }
    };

    foundMessages();
  }, [receiverId, currentUser._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() && receiverId) {
      const msgData = {
        senderId: currentUser._id,
        receiverId,
        text: message.trim()
      };

      socket.emit('sendMessage', msgData);

      try {
        await axios.post('/api/messages', msgData);
      } catch (err) {
        console.error("Couldn't send message", err);
      }

      setMessages((prev) => [
        ...prev,
        {
          ...msgData,
          sender: {
            _id: currentUser._id,
            username: currentUser.username,
            avatar: currentUser.avatar
          },
          _id: Date.now() 
        }
      ]);

      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Liste des utilisateurs connectés */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h4>Online Users</h4>
        {onlineUsers
          .filter(user => user.userId !== currentUser._id)
          .map((user) => (
            <div
              key={`${user.userId}-${user.socketId}`}
              style={{
                cursor: 'pointer',
                padding: '5px',
                backgroundColor: receiverId === user.userId ? '#e0e0e0' : 'transparent',
                borderRadius: '5px'
              }}
              onClick={() => setReceiverId(user.userId)}
            >
              {user.username} {receiverId === user.userId && '✅'}
            </div>
          ))}
      </div>

      {/* Section messages */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          <h4>Messages</h4>
          {messages.map((msg) => {
            const isOwn = msg.sender._id === currentUser._id;
            return (
              <div
                key={msg._id || `${msg.sender._id}-${Math.random()}`}
                style={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  marginBottom: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: '60%' }}>
                  {!isOwn && (
                    <img
                      src={msg.sender.avatar}
                      alt="avatar"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginRight: '10px'
                      }}
                    />
                  )}
                  <div
                    style={{
                      background: isOwn ? '#dcf8c6' : '#f0f0f0',
                      padding: '10px',
                      borderRadius: '10px',
                      textAlign: 'left'
                    }}
                  >
                    <strong>{isOwn ? 'You' : msg.sender.username}</strong>
                    <br />
                    {msg.text}
                  </div>
                  {isOwn && (
                    <img
                      src={msg.sender.avatar}
                      alt="avatar"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginLeft: '10px'
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone d’écriture */}
        <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '10px'
            }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
