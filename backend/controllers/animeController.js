const Anime = require('../models/Anime');

const getAnimeList = async (req, res) => {
  try {
    const { q, page=1, limit=20 } = req.query;
    const filter = q ? { title: new RegExp(q, 'i') } : {};
    const skip = (page-1)*limit;
    const total = await Anime.countDocuments(filter);
    const items = await Anime.find(filter).skip(Number(skip)).limit(Number(limit)).sort({score:-1});
    res.json({ total, items });
  } catch (err) {
    console.error(err); res.status(500).json({ msg: 'Server error' });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ msg: 'Not found' });
    res.json(anime);
  } catch (err) {
    console.error(err); res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getAnimeList, getAnimeById };
