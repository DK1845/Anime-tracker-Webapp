const router = require('express').Router();
const { getAnimeList, getAnimeById } = require('../controllers/animeController');

router.get('/', getAnimeList);
router.get('/:id', getAnimeById);

module.exports = router;
