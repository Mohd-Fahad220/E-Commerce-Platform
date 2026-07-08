import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold">ECommerce</h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gray-200 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/users')}
              className="text-white hover:text-gray-200 transition"
            >
              Users
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="text-white hover:text-gray-200 transition"
            >
              Orders
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
