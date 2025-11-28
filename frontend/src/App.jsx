import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MainLayout from './components/UI/Sidebar';
import Employees from './pages/Authors/Authors';
import TaskManagement from './pages/Tasks/TaskManagement';
import CompletedTasks from './pages/Tasks/CompletedTasks';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
    navigate('/employees');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('token')) {
      return <Navigate to='/login' replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path='/login' element={<Login onLogin={handleLogin} />} />
      <Route path='/register' element={<Register />} />

      <Route path='/' element={
        <ProtectedRoute>
          <MainLayout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Employees token={token} />} />
        <Route path='employees' element={<Employees token={token} />} />
        <Route path='tasks' element={<TaskManagement token={token} />} />
        <Route path='completed' element={<CompletedTasks token={token} />} />
      </Route>

      <Route path='*' element={<Navigate to='/employees' replace />} />
    </Routes>
  );
}

export default App;
