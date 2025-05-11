import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { register } from '../JS/actions/authAction';

const Register = () => {

    const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
   const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }
  
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser));
  }

  return (
    <div>
        <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="username" placeholder="Username" value={newUser.username} onChange={handleChange} />
        <input name="email" placeholder="Email" value={newUser.email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          value={newUser.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Register
