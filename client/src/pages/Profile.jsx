import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../JS/actions/authAction';

const Profile = () => {
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();

  // Pour l'exemple, on gère localement les champs modifiables
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('');
  const [theme, setTheme] = useState('dark'); // dark ou light

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
      setStatus(user.status || 'Available to chat 💬');
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateProfile({ username, bio, status }))
  };

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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center text-2xl font-bold rounded-lg border border-gray-300 px-3 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Username"
          />
          <p className="text-gray-600 italic mt-2">{status}</p>
        </div>

        {/* Sections */}
        <div className="flex flex-col space-y-10">
          {/* Infos perso */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">
              Your Info
            </h3>
            <label className="block mb-2 font-medium text-gray-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <label className="block mt-6 mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full rounded-lg border border-gray-300 p-3 bg-gray-200 cursor-not-allowed"
            />
          </section>

          {/* Préférences */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">
              Preferences
            </h3>

            <div className="mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="text-gray-700">Dark Mode</span>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option>Available to chat 💬</option>
                <option>Busy 🔴</option>
                <option>Invisible 👻</option>
                <option>Offline ❌</option>
              </select>
              <button onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl w-full transition">
                Save Changes
              </button>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">
              Security
            </h3>

            <label className="block mb-2 font-medium text-gray-700">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full rounded-lg border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </section>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-10">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
            // onClick={handleDeleteAccount} à gérer plus tard
          >
            Delete Account
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            // onClick={handleLogout} à gérer plus tard
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
