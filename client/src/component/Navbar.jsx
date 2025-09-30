import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ onToggleTheme, theme }) {
  const loc = useLocation()
  return (
    <header className="bg-white dark:bg-slate-900 shadow p-3 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">AnimeTracker</Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className={`px-2 ${loc.pathname === '/' ? 'underline' : ''}`}>Discover</Link>
          <Link to="/watchlist" className={`px-2 ${loc.pathname === '/watchlist' ? 'underline' : ''}`}>Watchlist</Link>
          <Link to="/help" className={`px-2 ${loc.pathname === '/help' ? 'underline' : ''}`}>Help</Link>
          <Link to="/admin" className="px-2 text-sm rounded border px-3 py-1 hidden sm:inline">Admin</Link>
          <Link to="/login" className="px-2">Login</Link>
          <button onClick={onToggleTheme} className="ml-2">{theme === 'dark' ? '🌙' : '☀️'}</button>
        </nav>
      </div>
    </header>
  )
}
