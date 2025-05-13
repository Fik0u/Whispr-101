import React from 'react'
import { useSelector } from 'react-redux'
import Chat from '../components/Chat';

const Profile = () => {

    const user = useSelector(state => state.authReducer.user);
  return (
    <div>
      <h3>Hello {user.username} !</h3>
      <h4>This is your Profile page</h4>

      <Chat currentUser={user} />
    </div>
  )
}

export default Profile
