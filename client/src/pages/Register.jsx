import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { register } from '../JS/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <motion.div
        className="bg-gray-400 text-gray-900 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create your Whispr account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login"
              className="text-indigo-600 font-medium hover:underline hover:text-indigo-700 transition">
              Log In
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
