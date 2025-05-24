import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from '../components/EditProfile';

const Profile = () => {
  const user = useSelector(state => state.authReducer.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-10">
      <div className="bg-gray-100 text-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
        {/* Header profil */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={user.avatar || "https://refugedulacdulou.com/wp-content/uploads/2019/01/avatar-anonyme.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 border-4 border-indigo-600"
          />
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600 italic mt-2">{user.status || 'Available to chat 💬'}</p>
        </div>

        {/* Infos personnelles */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">Your Info</h3>
          <p className="mb-4"><strong>Bio:</strong> {user.bio || 'No bio provided.'}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </section>

        {/* Préférences */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">Preferences</h3>
          <p><strong>Status:</strong> {user.status}</p>
        </section>

        {/* Bouton Edit */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modale Edit */}
      {isModalOpen && (
        <EditProfile closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
