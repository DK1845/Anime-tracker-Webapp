import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function MyList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api.get('/users/me/list');
    setList(res.data);
    setLoading(false);
  };

  useEffect(()=>{ load() }, []);

  const remove = async (animeId) => {
    await api.delete(`/users/me/list/${animeId}`);
    load();
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>My List</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, 320px)', gap:12 }}>
      {list.map(it => (
        <div key={it.anime._id} style={{ border:'1px solid #ddd', padding:12 }}>
          <Link to={`/anime/${it.anime._id}`}>
            <img src={it.anime.image_url} alt={it.anime.title} style={{ width:'100%', height:220, objectFit:'cover' }} />
            <h4>{it.anime.title}</h4>
          </Link>
          <div>Status: {it.status}</div>
          <div>Score: {it.score ?? '—'}</div>
          <button onClick={()=>remove(it.anime._id)}>Remove</button>
        </div>
      ))}
      </div>
    </div>
  );
}
