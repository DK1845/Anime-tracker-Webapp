const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  title: { type: String, required: true },
  synopsis: String,
  posterUrl: String,
  episodes: Number,
  status: String,
  genres: [String],
  year: Number
}, { timestamps: true })

module.exports = mongoose.model('Show', ShowSchema)
