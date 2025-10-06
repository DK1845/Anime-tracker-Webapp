import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeCard.css';

export default function AnimeCard({ a }) {
  return (
    <div style={{ border:'1px solid #ddd', padding:12, width:200 }}>
      <Link to={`/anime/${a._id}`}>
        <img src={a.image_url} alt={a.title} style={{ width:'100%', height:280, objectFit:'cover' }} />
        <h4>{a.title}</h4>
      </Link>
      <div>Score: {a.score || 'N/A'}</div>
    </div>
  );
}
