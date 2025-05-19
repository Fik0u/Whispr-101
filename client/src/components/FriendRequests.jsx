import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondFriendRequest } from '../JS/actions/friendAction';

const FriendRequests = () => {

    const dispatch = useDispatch();
    const friendRequests = useSelector(state => state.friendReducer.friendRequests);

    const handleRespond = (senderId, accept) => {
        dispatch(respondFriendRequest(senderId, accept))
    };

  return (
    <div className='bg-gray-800 p-4 rounded-md shadow-md text-white'>
        <h2 className='text-lg font-semibold mb-3'>Friend Requests</h2>
        {friendRequests.length > 0 ? (
            friendRequests.map(reqUser => (
                <div key={reqUser._id} className='flex items-ceter justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                        <img src={reqUser.avatar} alt={reqUser.username} className='w-8 h-8 rounded-full' />
                        <span>{reqUser.username}</span>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => handleRespond(reqUser._id, "accepted")} className='px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-sm'>
                            Accept
                        </button>
                        <button onClick={() => handleRespond(reqUser._id, "declined")} className='px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm'>
                            Decline
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className='text-gray-400'>No pending Requests</p>
        )}
    </div>
  )
}

export default FriendRequests
