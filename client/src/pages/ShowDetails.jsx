import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'
import { SAMPLE_SHOWS } from '../data/sampleShows'

export default function ShowDetails() {
  const { id } = useParams()
  const [show, setShow] = useState(null)

  useEffect(() => {
    let mounted = true
    api.get(`/shows/${id}`).then(res => {
      if (!mounted) return
      setShow(res.data)
    }).catch(() => {
      const fallback = SAMPLE_SHOWS.find(s => s._id === id) || SAMPLE_SHOWS[0]
      setShow(fallback)
    })
    return () => { mounted = false }
  }, [id])

  async function addProgress() {
    try {
      await api.post('/watchlist', { showId: show._id, status: 'watching', episodesWatched: 1 })
      alert('Progress saved')
    } catch {
      alert('Please login to save progress (or server is not running).')
    }
  }

  if (!show) return <div className="p-4">Loading...</div>

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex gap-6 flex-col sm:flex-row">
        <img src={show.posterUrl} alt={show.title} className="w-48 h-64 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{show.title}</h1>
          <div className="text-sm text-slate-500">{(show.genres || []).join(' • ')} • {show.episodes} eps</div>
          <p className="mt-3">{show.synopsis}</p>
          <div className="mt-4 flex gap-2">
            <button onClick={addProgress} className="px-3 py-1 border rounded">Mark progress</button>
            <button className="px-3 py-1 border rounded">Add review</button>
          </div>
        </div>
      </div>
    </main>
  )
}
