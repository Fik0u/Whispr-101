import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './JS/actions/authAction';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

function App() {

  const dispatch = useDispatch();

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
        <Route path = '/profile' element = {<Profile />} />
        <Route path = '/*' element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
