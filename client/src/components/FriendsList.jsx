import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../JS/actions/friendAction';

const FriendsList = ({ userId }) => {

    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friendReducer.friendsList);
    
    useEffect(() => {
        if(userId) dispatch(getFriends(userId))
    }, [dispatch, userId]);

  return (
    <div>
        <h2 className='text-xl font-bold mb-4'>My Friends</h2>
        {friendsList.length === 0 ? (
            <p>You don't have friends yet 😢</p>
        ) : (
            <ul className='space-y-2'>
                {friendsList.map((friend) => (
                    <li key={friend._id} className='flex items-center gap-4'>
                        <img src={friend.avatar} alt={friend.username} className='w-10 h-10 rounded-full' />
                        <div>
                            <p className='font-medium'>{friend.username}</p>
                            <p className='text-sm text-gray-500'>{friend.status}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default FriendsList
