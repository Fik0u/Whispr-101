import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './JS/actions/authAction';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import Chats from './pages/Chats';
import Groups from './pages/Groups';
import Friends from './pages/Friends';

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.authReducer.isAuth)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(currentUser())
    }
  }, [dispatch])

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<Login />} />
        
        {isAuth && (
          <>
        <Route path = '/profile' element = {<Profile />} />
        <Route path = '/friends' element = {<Friends />} />
        <Route path = '/chats' element = {<Chats />} />
        <Route path = '/groups' element = {<Groups />} />
          </>
        )}

        <Route path = '/*' element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
