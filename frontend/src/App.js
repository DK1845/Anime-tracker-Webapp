import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle'; // import ThemeToggle
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimeDetail from './pages/AnimeDetail';
import MyList from './pages/MyList';
import { setToken } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    return raw ? JSON.parse(raw) : null;
  });

  const handleLogin = (u, token) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      {/* Header with Navbar and ThemeToggle */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
        }}
      >
        <Navbar user={user} onLogout={logout} />
        <ThemeToggle />
      </header>

      {/* Main content with routes */}
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetail user={user} />} />
          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/mylist"
            element={user ? <MyList user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
