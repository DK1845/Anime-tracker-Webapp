const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
  mal_id: { type: Number, unique: true },
  title: String,
  synopsis: String,
  type: String,
  episodes: Number,
  image_url: String,
  score: Number,
  url: String,
  genres: [String],
  aired: String,
  rating: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anime', AnimeSchema);
