import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGroup, clearSelectedGroup, createGroup, getGroups, removeUser, deleteGroup } from '../JS/actions/groupAction';
import GroupChat from '../components/GroupChat';
import FriendsList from '../components/FriendsList';
import AddMembers from '../components/AddMembers';
import { Trash2 } from 'lucide-react';


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
      admin: user._id,
      members: [...selectedMembers, user._id]
    };
    
    dispatch(createGroup(groupData));
    setShowCreateModal(false);
    setGroupName('');
    setSelectedMembers([]);
  };


  const handleToggleFriend = (friendId) => {
    if (selectedMembers.includes(friendId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== friendId));
    } else {
      setSelectedMembers([...selectedMembers, friendId]);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!selectedGroup) return;
    if (window.confirm('Are you sure you want to remove this member ?')) {
      const updatedGroup = await dispatch(removeUser(selectedGroup._id, memberId));
      dispatch(setSelectedGroup(updatedGroup.payload));
      dispatch(getGroups(user._id));
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this group ?')) {
      await dispatch(deleteGroup(groupId));
      dispatch(clearSelectedGroup());
      dispatch(getGroups(user._id));
    }
  };

  useEffect(() => {
    dispatch(getGroups(user._id));
  }, [dispatch, user._id]);


  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <div className="w-60 border-r border-zinc-700 p-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Groups</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
          >
            New Group
          </button>
        </div>

        {/* Group List */}
        {groups.length === 0 && <p className="text-zinc-500">No Groups Found</p>}
        {groups.map(group => (
          <div
            key={group._id}
            className={`flex justify-between items-center cursor-pointer p-3 rounded-lg mb-2 transition 
              ${selectedGroup?._id === group._id ? 'bg-blue-600' : 'hover:bg-zinc-700'}`}
          >
            <span onClick={() => dispatch(setSelectedGroup(group))} className='flex-1' >
            {group.name}
            </span>
            {group.admin._id === user._id && (
              <button onClick={() => handleDeleteGroup(group._id)} className='text-red-500 hover:text-red-700'>
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Members in Sidebar */}
        {selectedGroup && (
          <div className="mt-4">
            <div className='flex items-center justify-between mb-2'>
              <h4 className="text-lg font-bold text-zinc-400 mb-2">Group Members</h4>
              {selectedGroup.admin._id === user._id && (
                <AddMembers groupId={selectedGroup._id} userId={user._id} />
              )}
              </div>
              <ul className="space-y-2">
                {selectedGroup.members.map(member => (
                  <li
                  key={member._id}
                  className="flex justify-between items-center bg-zinc-800 p-2 rounded"
                  >
                  
                  <span>
                    {member.username}
                    {member._id === selectedGroup.admin._id && (
                      <span className="text-yellow-400 ml-1">★</span>
                    )}
                  </span>
                  {selectedGroup.admin._id === user._id && member._id !== user._id && (
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                    
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button */}
        {selectedGroup && (
          <button
            onClick={() => dispatch(clearSelectedGroup())}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Go Back
          </button>
        )}
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-4">
        {selectedGroup ? (
          <GroupChat />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-lg">
            Select a group & start chating with your mates
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-[400px]">
            <h3 className="text-lg font-bold mb-4 text-white">Create Group</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-zinc-700 text-white"
            />
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">Select Friends</h4>
              <FriendsList
                userId={user._id}
                displayType="sidebar"
                selectedFriends={selectedMembers}
                onToggleFriend={handleToggleFriend}
              />
              <p className="text-sm text-zinc-400 mt-2">
                {selectedMembers.length} member(s) selected
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCreateGroup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-red-500 px-4 py-2"
              >
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
