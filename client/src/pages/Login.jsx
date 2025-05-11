import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../JS/actions/authAction';

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user))
    };

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Login
