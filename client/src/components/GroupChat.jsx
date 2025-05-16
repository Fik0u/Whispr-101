import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupMessages, sendMessage } from '../JS/actions/groupAction';


const GroupChat = () => {
    const dispatch = useDispatch();
    const selectedGroup = useSelector(state => state.groupReducer.selectedGroup);
    const user = useSelector(state => state.authReducer.user);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        dispatch(sendMessage(selectedGroup._id, user._id, message));
        setMessage('');
    };
    useEffect(() => {
        if (selectedGroup) {
            dispatch(getGroupMessages(selectedGroup._id))
        }
    }, [selectedGroup, dispatch]);

  return (
        <div className="flex flex-col h-full p-4 bg-white rounded-xl shadow-lg">
      <div className="mb-4 border-b pb-2">
        <h2 className="text-xl font-bold">{selectedGroup?.name || 'Group'}</h2>
        <p className="text-sm text-gray-500">{selectedGroup?.description || ''}</p>
      </div>

      {/* Messages - à remplir plus tard */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
  {selectedGroup.messages && selectedGroup.messages.length > 0 ? (
    selectedGroup.messages.map((msg) => (
      <div key={msg._id} className="bg-gray-100 p-2 rounded-md">
        <p className="text-sm font-semibold">{msg.sender?.username || 'Utilisateur'}</p>
        <p>{msg.text}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-400">Aucun message pour ce groupe.</p>
  )}
</div>

      {/* Input de message */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Écris un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2 border rounded-xl"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default GroupChat
