import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import socket from '../socket';
import { addMessage, getMessages, receiveMessage, setReceiver } from '../JS/actions/chatAction';

const Chat = ({ currentUser }) => {

  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const dispatch = useDispatch();
  const { receiverId, messages } = useSelector(state => state.chatReducer);
  
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users/usersList');
        setAllUsers(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
      }
    };
    fetchUsers();
  }, []);

  // Gérer connexion socket et événements
  useEffect(() => {
    if (currentUser) {
      socket.emit('addUser', {
        userId: currentUser._id,
        username: currentUser.username,
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
          avatar: '/default-avatar.png',
        };
      }
      dispatch(receiveMessage(data))
    });

    return () => {
      socket.off('getUsers');
      socket.off('getMessage');
    };
  }, [currentUser, dispatch]);

  // Charger les messages entre currentUser et receiverId
  useEffect(() => {
    if (receiverId && currentUser) {
      dispatch(getMessages(currentUser._id, receiverId))
    }
  }, [receiverId, currentUser, dispatch]);

  // Scroll automatique quand messages changent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && receiverId) {
      const msgData = {
        senderId: currentUser._id,
        receiverId,
        text: message.trim(),
      };

      socket.emit('sendMessage', msgData);
      dispatch(addMessage({ ...msgData,
        sender: {
          _id: currentUser._id,
          username: currentUser.username,
          avatar: currentUser.avatar
        },
        _id: Date.now()
      }));
      setMessage('')
    }
  };

  // Fonction pour savoir si un utilisateur est en ligne
  const isUserOnline = (userId) => onlineUsers.some((u) => u.userId === userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Liste complète des utilisateurs */}
      <div style={{ width: '220px', borderRight: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        <h4>Users</h4>
        {allUsers
          .filter((user) => user._id !== currentUser._id)
          .map((user) => (
            <div
              key={user._id}
              onClick={() => dispatch(setReceiver(user._id))}
              style={{
                cursor: 'pointer',
                padding: '8px',
                marginBottom: '4px',
                backgroundColor: receiverId === user._id ? '#e0e0e0' : 'transparent',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* Cercle vert si en ligne */}
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isUserOnline(user._id) ? 'green' : 'transparent',
                  border: isUserOnline(user._id) ? 'none' : '1px solid #ccc',
                }}
              />
              <span>{user.username}</span>
            </div>
          ))}
      </div>

      {/* Section messages */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          <h4>Messages</h4>
          {receiverId ? (
            messages.map((msg) => {
              const isOwn = msg.sender._id === currentUser._id;
              return (
                <div
                  key={msg._id || `${msg.sender._id}-${Math.random()}`}
                  style={{
                    display: 'flex',
                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', maxWidth: '60%' }}>
                    {!isOwn && (
                      <img
                        src={msg.sender.avatar || '/default-avatar.png'}
                        alt="avatar"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                      />
                    )}
                    <div
                      style={{
                        background: isOwn ? '#dcf8c6' : '#f0f0f0',
                        padding: '10px',
                        borderRadius: '10px',
                        textAlign: 'left',
                      }}
                    >
                      <strong>{isOwn ? 'You' : msg.sender.username}</strong>
                      <br />
                      {msg.text}
                    </div>
                    {isOwn && (
                      <img
                        src={msg.sender.avatar || '/default-avatar.png'}
                        alt="avatar"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          marginLeft: '10px',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ color: '#999' }}>Select a user to start chatting</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone d’écriture */}
        <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={receiverId ? 'Type your message...' : 'Select a user to chat'}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '10px',
            }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={!receiverId}
          />
          <button onClick={sendMessage} disabled={!receiverId} style={{ padding: '10px 20px' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
