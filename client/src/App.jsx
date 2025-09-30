import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ShowDetails from './pages/ShowDetails'
import Watchlist from './pages/Watchlist'
import AdminPanel from './pages/AdminPanel'
import HelpDocs from './pages/HelpDocs'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/help" element={<HelpDocs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
