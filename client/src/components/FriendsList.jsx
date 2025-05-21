import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../JS/actions/friendAction';

const FriendsList = ({ userId, displayType = 'cards', onFriendClick, selectedFriends = [], onToggleFriend }) => {

    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friendReducer.friendsList);
    
    useEffect(() => {
        if(userId) dispatch(getFriends(userId))
    }, [dispatch, userId]);
    
    if (friendsList.length === 0) {
        return <p>You don't have friends yet 😢</p>
    };

    const handleClick = (friendId) => {
        if (onToggleFriend) {
            onToggleFriend(friendId)
        } else if (onFriendClick) {
            onFriendClick(friendId)
        }
    };

  return (
    <div>
        {displayType === 'cards' && <h2 className='text-xl font-bold mb-4'>My Friends</h2>}
        <ul className={displayType === 'sidebar' ? 'space-y-2' : 'grid grid-cols-2 md:grid-cols-3 gap-4'}>
                {friendsList.map((friend) => {
                    const isSelected = selectedFriends.includes(friend._id);
                    return (
                    <li key={friend._id}
                        onClick={() => handleClick(friend._id)}
                        className={` ${displayType === 'sidebar'
                            ? 'flex items-center gap-4 p-2 hover:bg-gray-100 rounded cursor-pointer'
                            : 'bg-white shadow rounded p-4 flex items-center gap-4'}
                            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        <img src={friend.avatar} alt={friend.username} className='w-10 h-10 rounded-full' />
                        <div>
                            <p className='font-medium'>{friend.username}</p>
                            <p className='text-sm text-gray-500'>{friend.status}</p>
                        </div>
                        {isSelected && <span className='ml-auto font-bold'>✓</span>}
                    </li>
                )
            })}
            </ul>
    </div>
  )
}

export default FriendsList
