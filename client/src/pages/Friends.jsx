import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendRequests } from '../JS/actions/friendAction';
import FriendRequests from '../components/FriendRequests';
import FriendsList from '../components/FriendsList';

const Friends = () => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    
    useEffect(() => {
        dispatch(getFriendRequests())
    }, [dispatch]);


  return (
    <div className='p-4 space-y-4'>
        <h1 className='text-2xl font-bold text-white'>Friend Requests</h1>
        <FriendRequests />

        <h1>Friends List</h1>
        <FriendsList userId = {user._id} />
    </div>
  )
}

export default Friends
