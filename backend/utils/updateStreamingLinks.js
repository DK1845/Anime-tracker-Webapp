require('dotenv').config();
const connectDB = require('../config/db');
const Anime = require('../models/Anime');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('🔗 Connecting to database...');

    const animes = await Anime.find();
    console.log(`Found ${animes.length} anime records`);

    for (const anime of animes) {
      anime.streamingLinks = {
        Netflix: `https://www.netflix.com/search?q=${encodeURIComponent(anime.title)}`,
        YouTube: `https://www.youtube.com/results?search_query=${encodeURIComponent(anime.title + " full episodes")}`,
        Crunchyroll: `https://www.crunchyroll.com/search?from=search&q=${encodeURIComponent(anime.title)}`
      };
      anime.videoUrl = "https://www.youtube.com/embed/MGRm4IzK1SQ"; // sample trailer
      await anime.save();
    }

    console.log('✅ All anime updated with streaming links & video URL');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
