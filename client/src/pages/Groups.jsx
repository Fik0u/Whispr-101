import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGroup, clearSelectedGroup, createGroup } from '../JS/actions/groupAction';
import GroupChat from '../components/GroupChat';
import FriendsList from '../components/FriendsList';

const Groups = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  const groups = useSelector(state => state.groupReducer.groups);
  const selectedGroup = useSelector(state => state.groupReducer.selectedGroup);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleCreateGroup = () => {
    if (!groupName || selectedMembers.length === 0) return;

    const groupData = {
      name: groupName,
      adminId: user._id,
      members: [...selectedMembers, user._id]
    };
    
    dispatch(createGroup(groupData));
    setShowCreateModal(false);
    setGroupName('');
    setSelectedMembers([])
  };

  const handleToggleFriend = (friendId) => {
    if (selectedMembers.includes(friendId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== friendId));
    } else {
      setSelectedMembers([...selectedMembers, friendId])
    }
  };


  return (
    <div className="flex h-screen bg-zinc-900 text-white">

      <div className="w-60 border-r border-zinc-700 p-4 overflow-y-auto">
        <div className='flex items-center justify-between mb-4'>
          <h2 className="text-xl font-bold">Groups</h2>
          <button onClick={() => setShowCreateModal(true)} className='bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm'>
            New Group
          </button>
        </div>
        {groups.length === 0 && <p className="text-zinc-500">No Groups Found</p>}
        {groups.map(group => (
          <div
            key={group._id}
            onClick={() => dispatch(setSelectedGroup(group))}
            className={`cursor-pointer p-3 rounded-lg mb-2 transition 
              ${selectedGroup?._id === group._id ? 'bg-blue-600' : 'hover:bg-zinc-700'}`}
          >
            {group.name}
          </div>
        ))}
        {selectedGroup && (
          <button
            onClick={() => dispatch(clearSelectedGroup())}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Go Back
          </button>
        )}
      </div>


      <div className="flex-1 p-4">
        {selectedGroup ? (
          <GroupChat />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-lg">
            Select a group & start chating with your mates
          </div>
        )}
      </div>

        {showCreateModal && (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-zinc-800 p-6 rounded-lg shadow-md w-[400px]'>
        <h3 className='text-lg font-bold mb-4 text-white'>Create Group</h3>
        <input type="text" placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} className='w-full p-2 mb-3 rounded bg-zinc-700 text-white' />
        <div className='mb-4'>
          <h4 className='font-semibold text-white mb-2'>Select Friends</h4>
          <FriendsList userId={user._id} displayType='sidebar' selectedFriends={selectedMembers} onToggleFriend={handleToggleFriend} />
          <p className='text-sm text-zinc-400 mt-2'>{selectedMembers.length} member(s) selected</p>
        </div>
        <div className='flex justify-end space-x-2'>
          <button onClick={handleCreateGroup} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>
            Create
          </button>
          <button onClick={() => setShowCreateModal(false)} className='text-red-500 px-4 py-2'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
    </div>
  );
};

export default Groups;
