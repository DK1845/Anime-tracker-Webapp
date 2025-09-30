import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowCard({ show, onAdd }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
      <Link to={`/show/${show._id}`} className="block">
        <img src={show.posterUrl} alt={show.title} className="w-full h-56 object-cover" />
      </Link>
      <div className="p-3">
        <h3 className="font-semibold">{show.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-2">{show.synopsis}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-slate-400">{show.episodes} eps</div>
          <button onClick={() => onAdd && onAdd(show)} className="text-sm px-2 py-1 rounded border">+ Watchlist</button>
        </div>
      </div>
    </article>
  )
}
