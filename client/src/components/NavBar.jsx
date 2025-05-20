import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../JS/actions/authAction";
import { searchUsers } from "../JS/actions/userAction";
import { ChevronDown, LogOut, User, Settings, Users } from "lucide-react";
import { sendFriendRequest } from "../JS/actions/friendAction";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = useSelector(state => state.userReducer.users);

  const friendRequests = useSelector(state => state.friendReducer.friendRequests);
  const friendRequestCount = friendRequests.length || 0;

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (searchRef.current && ! searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      dispatch(searchUsers(value));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-400 hover:text-indigo-500 transition"
        >
          Whispr 💬
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-300 transition">
            Home
          </Link>

          {!isAuth ? (
            <>
              <Link to="/about" className="hover:text-indigo-300 transition">
                About
              </Link>
              <Link to="/features" className="hover:text-indigo-300 transition">
                Features
              </Link>
              <Link to="/login" className="hover:text-indigo-300 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-indigo-300 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/chats" className="hover:text-indigo-300 transition">
                Chats
              </Link>
              <Link to="/groups" className="hover:text-indigo-300 transition">
                Groups
              </Link>
              
              {/* Search Bar  */}
              <div className="relative" ref={searchRef}>
                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search a user" className="px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {showResults && (
                  <div className="absolute bg-gray-900 border border-gray-700 mt-2 rounded-md w-64 max-h-60 overflow-y-auto z-50">

                    {searchResults.map(u => {
                      const alreadySent = user.sentRequests.includes(u._id)
                    return (
                      <div key={u._id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-800 transition">
                          <div className="flex items-center gap-2">
                            <img src={u.avatar} alt={u.username} className="w-8 h-8 rounded-full" />
                            <span>{u.username}</span>
                          </div>
                          <button className={`text-sm px-2 py-1 roundes ${alreadySent ? "text-gray-500 cursor-not-allowed" : "text-indigo-400 hover:text-indigo-500"}`} 
                          onClick={() => !alreadySent && dispatch(sendFriendRequest(u._id))} disabled={alreadySent}>{alreadySent ? "Pending" : "Add"}</button>
                      </div>
                    )})}
                  </div>
                )}
              </div>

              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 hover:text-indigo-300 transition"
                >
                  <span className="text-indigo-400 font-semibold">{user?.username}</span>
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="mr-2" size={16} />
                      My Profile
                    </Link>
                    <Link 
                      to="/friends"
                      className="flex items-center px-4 py-2 hover:bg-gray-700 transition relative"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Users className="mr-2" size={16} />
                      Friends
                      {friendRequestCount > 0 && (
                        <span className="ml-2 bg-red-600 text-xs px-2 py-0.5 rounded-full shadow-sm">{friendRequestCount}</span>
                      )}
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="mr-2" size={16} />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 w-full text-left hover:bg-red-600 transition text-red-400"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
