import React from 'react';


const About = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-400">
          About Whispr
        </h1>

        <p className="text-lg mb-4 text-gray-300 leading-relaxed">
          Whispr is a real-time messaging app designed for people who want to stay connected effortlessly.
          Our mission is to provide a fast, smooth, and secure experience for chatting with friends
          and loved ones.
        </p>
        <p className="text-lg mb-4 text-gray-300 leading-relaxed">
          Whether you're sending instant messages, creating private groups, or personalizing your profile,
          Whispr gives you all the tools you need to keep in touch. With a modern and intuitive interface,
          staying connected has never felt so good.
        </p>
        <p className="text-lg mb-4 text-gray-300 leading-relaxed">
          We care deeply about privacy and ease of use. No ads, no tracking — just you and your conversations.
        </p>

        <div className="mt-10 text-center">
          <p className="text-md text-gray-500 italic">
            Built with ❤️ by a passionate developer.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
