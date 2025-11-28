// frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      if (onLogin) onLogin(token);
      navigate('/employees'); // redirect after login
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed. Check credentials.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col"
        onSubmit={submit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {err && <div className="text-red-500 mb-3 text-center">{err}</div>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
