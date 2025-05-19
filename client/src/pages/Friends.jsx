import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getFriendRequests } from '../JS/actions/friendAction';
import FriendRequests from '../components/FriendRequests';

const Friends = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getFriendRequests())
    }, [dispatch]);


  return (
    <div className='p-4 space-y-4'>
        <h1 className='text-2xl font-bold text-white'>Friend Requests</h1>
        <FriendRequests />

        {/* TODO: DISPLAY FRIENDS LIST HERE  */}
    </div>
  )
}

export default Friends
