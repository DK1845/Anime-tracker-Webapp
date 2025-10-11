import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeCard.css';

export default function AnimeCard({ a }) {
  return (
    <div className="anime-card">
      <Link to={`/anime/${a._id}`} className="anime-link">
        <img
          src={a.image_url}
          alt={a.title}
          className="anime-img"
        />
        <h4 className="anime-title">{a.title}</h4>
      </Link>

      <div className="anime-score">⭐ {a.score || 'N/A'}</div>

      {a.streamingLinks && Object.keys(a.streamingLinks).length > 0 && (
        <div className="anime-streams">
          <strong>Watch on:</strong>
          <ul>
            {Object.entries(a.streamingLinks).map(([platform, link]) => (
              <li key={platform}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
