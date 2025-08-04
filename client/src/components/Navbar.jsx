import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link className="text-2xl font-bold tracking-wider" to="/">
          MyNotebook
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            className={`text-lg hover:text-blue-400 transition-colors duration-300 ${location.pathname === '/' ? 'text-blue-400' : ''}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`text-lg hover:text-blue-400 transition-colors duration-300 ${location.pathname === '/about' ? 'text-blue-400' : ''}`}
            to="/about"
          >
            About
          </Link>
        </div>
        {!localStorage.getItem('token') ? (
          <div className="flex space-x-4">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
              Login
            </Link>
            <Link to="/signup" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
              Signup
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;