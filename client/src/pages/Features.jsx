import React from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Users,
  ShieldCheck,
  Paintbrush,
  BellRing,
  SmilePlus,
} from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: 'Real-Time Chat',
    description: 'Instant messaging powered by Socket.IO with typing indicators and smooth updates.',
  },
  {
    icon: Users,
    title: 'Private & Group Conversations',
    description: 'Chat one-on-one or create groups to stay connected with friends and communities.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy Focused',
    description: 'No ads, no trackers. Your conversations are safe, private, and encrypted.',
  },
  {
    icon: Paintbrush,
    title: 'Custom Profiles',
    description: 'Personalize your avatar, bio, and status to express your personality.',
  },
  {
    icon: BellRing,
    title: 'Smart Notifications',
    description: 'Stay updated without the spam. Only what matters, when it matters.',
  },
  {
    icon: SmilePlus,
    title: 'Friendly UI',
    description: 'Designed for comfort and clarity, with a dark theme that’s easy on the eyes.',
  },
]

const Features = () => {
  return (
    <div className="relative overflow-hidden bg-gray-950 text-white min-h-screen px-6 py-16">

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl top-10 left-[-100px] animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl top-1/2 right-[-150px] animate-ping" />
        <div className="absolute w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-2xl bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-purple-400 mb-4">
          Discover Whispr's Features
        </h1>
        <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Every detail is designed to make chatting more human, secure, and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-purple-600/30 transition-all"
              >
                <div className="flex items-center text-purple-400 mb-4">
                  <Icon className="w-7 h-7 mr-3" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
          >
            Join Whispr Now
          </motion.a>
        </div>
      </div>
    </div>
  )
}

export default Features
