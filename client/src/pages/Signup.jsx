import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      return showAlert("Passwords do not match", "danger");
    }
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.authToken) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      showAlert('Account Created Successfully', 'success');
    } else {
      showAlert(json.error || 'An error occurred', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Name</label>
            <input type="text" name="name" id="name" value={credentials.name} onChange={onChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} required minLength={5} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="cpassword" className="text-sm font-bold text-gray-600 block">Confirm Password</label>
            <input type="password" name="cpassword" id="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold">Sign Up</button>
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;