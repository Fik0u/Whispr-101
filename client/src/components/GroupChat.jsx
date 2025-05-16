import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import { getGroupMessages, sendMessage } from '../JS/actions/groupAction';

const GroupChat = () => {
    const dispatch = useDispatch();
    const selectedGroup = useSelector(state => state.groupReducer.selectedGroup);
    const groupMessages = useSelector(state => state.groupReducer.groupMessages[selectedGroup?._id] || []);
    const user = useSelector(state => state.authReducer.user);

    const [message, setMessage] = useState('');
    const [liveMessages, setLiveMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [groupMessages, liveMessages]);

    useEffect(() => {
        if (selectedGroup?._id) {
            dispatch(getGroupMessages(selectedGroup._id));
            setLiveMessages([]);
            socket.emit('joinGroup', selectedGroup._id);
        }

        const handleIncoming = (msg) => {
            setLiveMessages(prev => [...prev, msg]);
        };

        socket.on('getGroupMessage', handleIncoming);

        return () => {
            socket.off('getGroupMessage', handleIncoming);
        };
    }, [selectedGroup, dispatch]);

    const handleSend = () => {
        if (!message.trim()) return;

        socket.emit('sendGroupMessage', {
            groupId: selectedGroup._id,
            senderId: user._id,
            text: message
        });

        dispatch(sendMessage(selectedGroup._id, user._id, message));
        setMessage('');
    };

    const allMessages = [...groupMessages, ...liveMessages];

    return (
        <div className="flex flex-col h-full p-4 bg-zinc-900 text-white rounded-xl shadow-lg">
            <div className="mb-4 border-b border-zinc-700 pb-2">
                <h2 className="text-2xl font-bold text-white">{selectedGroup?.name || 'Groupe'}</h2>
                <p className="text-sm text-zinc-400">{selectedGroup?.description || ''}</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-1 custom-scrollbar">
                {allMessages.length > 0 ? (
                    allMessages.map((msg) => {
                        const isOwn = msg.sender?._id === user._id;
                        return (
                            <div
                                key={msg._id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md p-3 rounded-xl shadow 
                                    ${isOwn ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}
                                >
                                    <p className="text-xs font-semibold mb-1">
                                        {msg.sender?.username || 'Utilisateur'}
                                    </p>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-zinc-500">Aucun message pour ce groupe.</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 mt-auto pt-2 border-t border-zinc-700">
                <input
                    type="text"
                    placeholder="Écris un message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition font-semibold"
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default GroupChat;
