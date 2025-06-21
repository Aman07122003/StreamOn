import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({ onLogout, className = '' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // Use `.unwrap()` for better error handling
      if (onLogout) onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-red-500 hover:text-white transition-colors rounded-b-xl font-medium ${className}`}
    >
      <FiLogOut className="w-5 h-5" />
      {loading ? (
        <span className="loader border-white border-t-transparent border-2 w-4 h-4 rounded-full animate-spin inline-block"></span>
      ) : (
        'Logout'
      )}
    </button>
  );
};

export default LogoutButton;

// Tailwind loader utility (add to global CSS if not present):
// .loader { border-top-color: transparent; border-radius: 9999px; } 