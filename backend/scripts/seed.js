// seed.js - run `npm run seed` to populate DB
require('dotenv').config();
const axios = require('axios');
const connectDB = require('../config/db');
const Anime = require('../models/Anime');

const MONGO_URI = process.env.MONGO_URI;
const PAGES = Number(process.env.SEED_JIKAN_PAGES || 1);

(async () => {
  try {
    await connectDB(MONGO_URI);
    console.log('Clearing anime collection...');
    await Anime.deleteMany({});

    let inserted = 0;
    for (let p = 1; p <= PAGES; p++) {
      console.log('Fetching page', p);
      const resp = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${p}`);
      const arr = resp.data.data;
      for (const item of arr) {
        const doc = {
          mal_id: item.mal_id,
          title: item.title,
          synopsis: item.synopsis,
          type: item.type,
          episodes: item.episodes,
          image_url: item.images?.jpg?.image_url || item.image_url,
          score: item.score,
          url: item.url,
          genres: (item.genres || []).map(g => g.name),
          aired: item.aired?.string || '',
          rating: item.rating || ''
        };
        try {
          await Anime.create(doc);
          inserted++;
        } catch (e) {
          // ignore duplicates
        }
      }
    }
    console.log(`Inserted ${inserted} anime.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
