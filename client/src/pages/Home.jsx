import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MessageSquare, Lock, Users, Zap } from "lucide-react";

const Home = () => {

  const navigate = useNavigate();
  const isAuth = useSelector(state => state.authReducer.isAuth);


  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to gray-950 text-white'>
      <section className='text-center py-24 px-6'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y:0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl md:text-6xl font-bold mb-4'
        >
          Whispr — Speak freely, connect instantly.
        </motion.h1>
        <p className='text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300'>
          Join real-time conversations, privately or in groups. No noise. Just you and others.
        </p>
        <div className='flex justify-center gap-4'>
          {!isAuth ? (
            <>
          <button onClick={() => navigate('/register')} className="text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">Sign Up</button>
          <button onClick={() => navigate('/login')} className="text-lg px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition">Log In</button>
            </>
          ) : (
            <button onClick={() => navigate('/chats')} className='text-lg px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold'>Start Chatting</button>
          )}
        </div>
      </section>

      <section className='py-20 px-6 bg-gray-900'>
        <h2 className='text-3xl font-bold text-center mb-12'>Why Whispr ?</h2>
        <div className='grid md:grid-cols-4 gap-8 max-w-6xl mx-auto'>
          <Feature icon={<MessageSquare />} title='Private Chats' description='Ultra-fast and secure conversations.' />
          <Feature icon={<Users />} title='Flexible Groups' description='Easily manage your group discussions.' />
          <Feature icon={<Zap />} title='Real-Time' description='No delay — everything happens live.' />
          <Feature icon={<Lock />} title='Privacy' description='No tracking, encrypted data.' />
        </div>
      </section>
      <footer className='py-12 text-center text-sm text-gray-500 border-t border-gray-700'>
        <p>© 2025 Whispr. All rights reserved.</p>
        <div className='flex justify-center gap-6 mt-4'>
          <a href="/" className='hover:underline'>About</a>
          <a href="/" className='hover:underline'>Privacy Policy</a>
          <a href="/" className='hover:underline'>Terms</a>
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
    >
      <div className="mb-4 text-indigo-400 mx-auto w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
}

export default Home
