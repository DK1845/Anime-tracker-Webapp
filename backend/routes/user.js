const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMyList, addToList, removeFromList } = require('../controllers/userController');

router.get('/me/list', auth, getMyList);
router.post('/me/list', auth, addToList);
router.delete('/me/list/:animeId', auth, removeFromList);

module.exports = router;
