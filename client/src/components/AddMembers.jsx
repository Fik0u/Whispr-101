import React, { useState } from 'react';
import FriendsList from './FriendsList';
import { useDispatch } from 'react-redux';
import { addUser } from '../JS/actions/groupAction';

const AddMembers = ({ groupId, userId }) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectedFriends([]);
        setOpen(false);
    };


    const toggleFriend = (friendId) => {
        setSelectedFriends((prev) => prev.includes(friendId)
            ? prev.filter((id) => id !== friendId)
            : [...prev, friendId]
        );
    };

    const handleAddMembers = async () => {
        try {
            await Promise.all(
                selectedFriends.map((friendId) => 
                dispatch(addUser(groupId, friendId))
                )
            )
            handleClose();
        } catch (error) {
            console.error("Error adding members:", error);
        }
    };


  return (
    <>
        <button onClick={handleOpen} className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'> + </button>
        {open && (
            <div className='fixed inset-0 bg-black-opacity-50 flex justify-center items-center z-50' onClick={() => setOpen(false)}>
                <div className='bg-zinc-800 p-6 rounded shadow-lg max-w-sm w-full' onClick={(e) => e.stopPropagation()}>

                    <h2 className='text-white text-lg mb-4'>Add Members</h2>

                    <FriendsList userId={userId} selectedFriends={selectedFriends} onToggleFriend={toggleFriend} displayType='sidebar' />

                    <button onClick={() => setOpen(false)} className='mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded'>Close</button>

                    <button onClick={handleAddMembers} className='mt-4 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'>Add Selected</button>
                </div>
            </div>
        )}
    </>
  )
}

export default AddMembers
