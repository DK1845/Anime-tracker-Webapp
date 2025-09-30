const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WL = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
  status: { type: String, enum: ['plan_to_watch', 'watching', 'completed', 'on_hold', 'dropped'], default: 'plan_to_watch' },
  episodesWatched: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 10 },
  notes: String
}, { timestamps: true })

module.exports = mongoose.model('WatchlistItem', WL)
