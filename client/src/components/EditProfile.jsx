import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../JS/actions/authAction';

const EditProfile = ({ closeModal }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const [username, setUsername] = useState(user.username || '');
    const [bio, setBio] = useState(user.bio || '');
    const [status, setStatus] = useState(user.status || 'Available to chat 💬');
    const [avatar, setAvatar] = useState(null);
  

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setBio(user.bio || '');
            setStatus(user.status || 'Available to chat 💬');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('bio', bio);
        formData.append('status', status);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        await dispatch(updateProfile(formData));
        closeModal();
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        {/* Avatar */}
        <div>
            <label className="block text-gray-700 font-medium mb-1">Avatar</label>
            <img src={avatar ? URL.createObjectURL(avatar) : user.avatar} alt="Avatar preview" className='w-20 h-20 rounded-full mb-2 object-cover' />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="w-full border rounded-lg p-2"
            />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Username"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="w-full border rounded-lg p-2 resize-none"
            placeholder="Bio"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option>Available to chat 💬</option>
            <option>Busy 🔴</option>
            <option>Invisible 👻</option>
            <option>Offline ❌</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>

        {/* Close Icon */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
