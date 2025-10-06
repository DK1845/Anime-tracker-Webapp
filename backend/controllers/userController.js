const User = require('../models/User');
const Anime = require('../models/Anime');

const getMyList = async (req, res) => {
  const user = await User.findById(req.user._id).populate('list.anime');
  res.json(user.list);
};

const addToList = async (req, res) => {
  const { animeId, status='plan-to-watch', score } = req.body;
  const anime = await Anime.findById(animeId);
  if (!anime) return res.status(404).json({ msg: 'Anime not found' });

  const user = await User.findById(req.user._id);
  const existingIdx = user.list.findIndex(it => it.anime.toString() === animeId);
  if (existingIdx >= 0) {
    user.list[existingIdx].status = status;
    if (typeof score !== 'undefined') user.list[existingIdx].score = score;
  } else {
    user.list.push({ anime: anime._id, status, score });
  }
  await user.save();
  const populated = await user.populate('list.anime');
  res.json(populated.list);
};

const removeFromList = async (req, res) => {
  const animeId = req.params.animeId;
  const user = await User.findById(req.user._id);
  user.list = user.list.filter(it => it.anime.toString() !== animeId);
  await user.save();
  res.json(user.list);
};

module.exports = { getMyList, addToList, removeFromList };
