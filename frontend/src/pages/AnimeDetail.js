import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function AnimeDetail({ user }) {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [status, setStatus] = useState('plan-to-watch');
  const [score, setScore] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get(`/anime/${id}`).then(r => {
      setAnime(r.data);
    }).catch(()=>{});
  }, [id]);

  const add = async () => {
    try {
      const res = await api.post('/users/me/list', { animeId: id, status, score: score ? Number(score) : undefined });
      setMsg('Updated list');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Action failed');
    }
  };

  if (!anime) return <div>Loading...</div>;
  return (
    <div style={{ display:'flex', gap:16 }}>
      <img src={anime.image_url} alt={anime.title} style={{ width:300 }} />
      <div>
        <h2>{anime.title}</h2>
        <div>Score: {anime.score}</div>
        <p>{anime.synopsis}</p>

        {user ? (
          <div>
            <h4>Add/update to your list</h4>
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="watching">watching</option>
              <option value="completed">completed</option>
              <option value="on-hold">on-hold</option>
              <option value="dropped">dropped</option>
              <option value="plan-to-watch">plan-to-watch</option>
            </select>
            <input placeholder="score 0-10" value={score} onChange={e=>setScore(e.target.value)} />
            <button onClick={add}>Save</button>
            {msg && <div>{msg}</div>}
          </div>
        ) : <div>Please login to add to list</div>}
      </div>
    </div>
  );
}
