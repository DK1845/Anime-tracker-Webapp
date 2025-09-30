import React, { useEffect, useState } from 'react'
import ShowCard from '../components/ShowCard'
import api from '../lib/api'
import { SAMPLE_SHOWS } from '../data/sampleShows'

export default function Home() {
  const [shows, setShows] = useState([])

  useEffect(() => {
    let mounted = true
    api.get('/shows').then(res => {
      if (!mounted) return
      setShows(res.data)
    }).catch(err => {
      // fallback to local sample data if server not running
      setShows(SAMPLE_SHOWS)
    })
    return () => { mounted = false }
  }, [])

  async function addToWatchlist(show) {
    try {
      await api.post('/watchlist', { showId: show._id, status: 'plan_to_watch', episodesWatched: 0 })
      alert(`${show.title} added to your watchlist`)
    } catch (e) {
      alert('Please login to add to watchlist (or server is not running).')
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Discover</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shows.map(s => <ShowCard key={s._id} show={s} onAdd={addToWatchlist} />)}
      </div>
    </main>
  )
}
