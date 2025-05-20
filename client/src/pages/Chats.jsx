import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import { addMessage, getMessages, receiveMessage, setReceiver } from '../JS/actions/chatAction';
import FriendsList from '../components/FriendsList';

const Chats = () => {
  const [message, setMessage] = useState('');
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const currentUser = useSelector(state => state.authReducer.user);
  const { receiverId, messages } = useSelector(state => state.chatReducer);

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      socket.emit('addUser', {
        userId: currentUser._id,
        username: currentUser.username,
      });
    }

    // socket.on('getUsers', (users) => {
    //   setOnlineUsers(users);
    // });

    socket.on('getMessage', (data) => {
      if (!data.sender || !data.sender._id) {
        data.sender = {
          _id: data.senderId || 'unknown',
          username: 'Unknown',
          avatar: '/default-avatar.png',
        };
      }
      dispatch(receiveMessage(data));
    });

    return () => {
      socket.off('getUsers');
      socket.off('getMessage');
    };
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (receiverId) {
      dispatch(getMessages(currentUser._id, receiverId));
    }
  }, [receiverId, currentUser._id, dispatch]);

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
      dispatch(addMessage({
        ...msgData,
        sender: {
          _id: currentUser._id,
          username: currentUser.username,
          avatar: currentUser.avatar,
        },
        _id: Date.now(),
      }));
      setMessage('');
    }
  };


  return (
    <div className="chat-page" style={{ display: 'flex', height: '100vh' }}>

      <aside className="user-list" style={{ width: 250, borderRight: '1px solid #ddd', padding: 15, overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
        <h3 className='font-semibold mb-4'>Friends</h3>
        <FriendsList userId={currentUser._id} displayType='sidebar' onFriendClick={(friendId) => dispatch(setReceiver(friendId))} />
      </aside>


      <main className="chat-window" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <header style={{ padding: '15px 20px', borderBottom: '1px solid #ddd', fontWeight: '600', fontSize: 18 }}>
          {receiverId ? `Chat with ${allUsers.find(u => u._id === receiverId)?.username || 'User'}` : 'Select a contact to start chatting'}
        </header>
        
        <section
          className="messages"
          style={{ flex: 1, overflowY: 'auto', padding: 20, backgroundColor: '#f3f4f6' }}
        >
          {receiverId ? (
            messages.map(msg => {
              const isOwn = msg.sender._id === currentUser._id;
              return (
                <div
                  key={msg._id || `${msg.sender._id}-${Math.random()}`}
                  style={{
                    display: 'flex',
                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      maxWidth: '60%',
                      padding: 12,
                      borderRadius: 15,
                      backgroundColor: isOwn ? '#60a5fa' : '#e5e7eb',
                      color: isOwn ? 'white' : 'black',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    }}
                  >
                    <strong>{isOwn ? 'You' : msg.sender.username}</strong>
                    <p style={{ margin: '6px 0 0 0' }}>{msg.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>No contact selected</p>
          )}
          <div ref={messagesEndRef} />
        </section>

        <footer style={{ padding: 15, borderTop: '1px solid #ddd', display: 'flex', gap: 12 }}>
          <input
            type="text"
            placeholder={receiverId ? 'Type your message...' : 'Select a contact to chat'}
            disabled={!receiverId}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!receiverId}
            style={{
              backgroundColor: '#3b82f6',
              border: 'none',
              color: 'white',
              borderRadius: 10,
              padding: '12px 20px',
              cursor: receiverId ? 'pointer' : 'not-allowed',
              fontWeight: '600',
            }}
          >
            Send
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Chats;
