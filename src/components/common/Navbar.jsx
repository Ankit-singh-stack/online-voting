import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaVoteYea, FaUser, FaSignOutAlt, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center">
              <FaVoteYea className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Online Voting</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaChartBar className="mr-2" />
                Dashboard
              </Link>
            )}

            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-700">
                <FaUser className="mr-2" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;