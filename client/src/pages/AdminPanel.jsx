import React, { useEffect, useState } from 'react'
import api from '../lib/api'

export default function AdminPanel() {
  const [shows, setShows] = useState([])
  const [title, setTitle] = useState('')
  const [posterUrl, setPosterUrl] = useState('')

  useEffect(() => { loadShows() }, [])

  async function loadShows() {
    try {
      const res = await api.get('/shows')
      setShows(res.data)
    } catch {
      setShows([])
    }
  }

  async function addShow() {
    try {
      await api.post('/shows', { title, posterUrl, synopsis: '', episodes: 12, genres: [], year: 2024 })
      setTitle(''); setPosterUrl('')
      await loadShows()
    } catch (e) {
      alert('Admin access required or server not running.')
    }
  }

  async function remove(id) {
    try {
      await api.delete(`/shows/${id}`)
      await loadShows()
    } catch {
      alert('Admin access required or server not running.')
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Admin Control Panel</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h3 className="font-semibold">Create Show</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="mt-2 w-full p-2 border rounded" />
          <input value={posterUrl} onChange={e => setPosterUrl(e.target.value)} placeholder="Poster URL" className="mt-2 w-full p-2 border rounded" />
          <button onClick={addShow} className="mt-2 px-3 py-1 border rounded">Add show</button>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h3 className="font-semibold">Shows</h3>
          <div className="mt-2 space-y-2">
            {shows.map(s => (
              <div key={s._id} className="flex items-center justify-between">
                <div>{s.title}</div>
                <div>
                  <button onClick={() => remove(s._id)} className="px-2 py-1 border rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
            {shows.length === 0 && <div className="text-sm text-slate-500">No shows loaded.</div>}
          </div>
        </div>
      </div>
    </main>
  )
}
