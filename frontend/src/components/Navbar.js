import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  return (
    <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {user && <Link to="/mylist">My List</Link>}
      <div style={{ marginLeft:'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight:8 }}>Hi, {user.username}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight:8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
