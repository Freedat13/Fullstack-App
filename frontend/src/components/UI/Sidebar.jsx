import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function MainLayout({ onLogout }){
  const loc = useLocation();
  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">Fullstack</h1>
        <nav>
          <Link className={loc.pathname.includes('employees') ? 'active' : ''} to="/employees">Employees</Link>
          <Link className={loc.pathname.includes('tasks') ? 'active' : ''} to="/tasks">Tasks</Link>
          <Link className={loc.pathname.includes('completed') ? 'active' : ''} to="/completed">Completed</Link>
        </nav>
        <button className="logout" onClick={onLogout}>Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
