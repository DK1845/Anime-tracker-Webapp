import React, { useEffect, useState } from 'react'
import api from '../lib/api'
import { SAMPLE_SHOWS } from '../data/sampleShows'

export default function Watchlist() {
  const [items, setItems] = useState([])
  const [shows, setShows] = useState([])

  async function load() {
    try {
      const res = await api.get('/watchlist')
      setItems(res.data)
      // fetch shows for display
      const showsRes = await api.get('/shows')
      setShows(showsRes.data)
    } catch {
      // fallback: none
      setItems([])
      setShows(SAMPLE_SHOWS)
    }
  }

  useEffect(() => { load() }, [])

  function showFor(item) {
    return shows.find(s => String(s._id) === String(item.showId)) || { title: 'Unknown', posterUrl: 'https://placehold.co/120x160' }
  }

  async function inc(item) {
    try {
      await api.put(`/watchlist/${item._id}`, { episodesWatched: (item.episodesWatched || 0) + 1 })
      await load()
    } catch {
      alert('Login required or server not running.')
    }
  }

  async function remove(item) {
    try {
      await api.delete(`/watchlist/${item._id}`)
      await load()
    } catch {
      alert('Login required or server not running.')
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
      <div className="space-y-3">
        {items.length === 0 && <div className="text-sm text-slate-500">No items yet. Add from Discover.</div>}
        {items.map(it => {
          const s = showFor(it)
          return (
            <div key={it._id} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded">
              <img src={s.posterUrl} alt="poster" className="w-20 h-28 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-slate-500">{it.status} • {it.episodesWatched || 0} watched</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => inc(it)} className="px-2 py-1 border rounded text-sm">+1 ep</button>
                  <button onClick={() => remove(it)} className="px-2 py-1 border rounded text-sm">Remove</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
