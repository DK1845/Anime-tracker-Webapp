import React, { useEffect, useState } from 'react';
import api from '../api';
import AnimeCard from '../components/AnimeCard';
import './Home.css';

export default function Home(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await api.get('/anime?limit=30');
    setItems(res.data.items);
  };

  const search = async (e) => {
    e.preventDefault();
    const res = await api.get('/anime', { params: { q, limit: 30 }});
    setItems(res.data.items);
  };

  return (
    <div>
      <form onSubmit={search} style={{ marginBottom:12 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search anime..." />
        <button>Search</button>
      </form>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, 220px)', gap:12 }}>
        {items.map(a => <AnimeCard key={a._id} a={a} />)}
      </div>
    </div>
  );
}
