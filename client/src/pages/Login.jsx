import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.authToken) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      showAlert('Logged In Successfully', 'success');
    } else {
      showAlert('Invalid Credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login to MyNotebook</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold">Login</button>
        </form>
        <p className="text-center">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;