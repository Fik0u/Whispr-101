import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './JS/actions/authAction';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(currentUser())
    }
  }, [dispatch])

  return (
    <div className="App">
      <h1>Whispr Live Chat App</h1>

      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/*' element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
