const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  status: { type: String, enum: ['watching','completed','on-hold','dropped','plan-to-watch'], default: 'plan-to-watch' },
  score: { type: Number, min: 0, max: 10 },
  progress: { type: Number, default: 0 }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  list: [ListItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
