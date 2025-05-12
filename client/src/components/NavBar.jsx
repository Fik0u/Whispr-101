import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../JS/actions/authAction";

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const user = useSelector(state => state.authReducer.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };

  return (
    <nav style={styles.nav}>
        <h2 style={styles.logo}>Whispr 💬</h2>
        <div style={styles.links}>
            <Link to = '/' style={styles.link} >Home</Link>
            {!isAuth ? (
                <>
            <Link to = '/login' style={styles.link} >Login</Link>
            <Link to = '/register' style={styles.link} >Register</Link>
                </>
            ) : (
                <>
            <span style={styles.username}> Hi, {user.username}</span>
            <Link to = '/profile' style={styles.link} >Profile</Link>
            <button onClick={handleLogout} style={styles.logoutBtn} >Logout</button>
                </>
            )}
        </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 20px',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  username: {
    color: '#1abc9c',
    fontWeight: 'bold',
  }
};

export default NavBar
