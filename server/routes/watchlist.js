const express = require('express')
const WatchlistItem = require('../models/WatchlistItem')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

// GET user's watchlist
router.get('/', async (req, res) => {
  const items = await WatchlistItem.find({ userId: req.user._id }).populate('showId')
  res.json(items)
})

// POST add/update
router.post('/', async (req, res) => {
  const { showId, status, episodesWatched, rating, notes } = req.body
  let item = await WatchlistItem.findOne({ userId: req.user._id, showId })
  if (item) {
    item.status = status ?? item.status
    item.episodesWatched = episodesWatched ?? item.episodesWatched
    item.rating = rating ?? item.rating
    item.notes = notes ?? item.notes
    await item.save()
    return res.json(item)
  }
  item = await WatchlistItem.create({ userId: req.user._id, showId, status, episodesWatched, rating, notes })
  res.json(item)
})

// PUT update item
router.put('/:id', async (req, res) => {
  const it = await WatchlistItem.findOne({ _id: req.params.id, userId: req.user._id })
  if (!it) return res.status(404).json({ error: 'Not found' })
  Object.assign(it, req.body)
  await it.save()
  res.json(it)
})

// DELETE
router.delete('/:id', async (req, res) => {
  await WatchlistItem.deleteOne({ _id: req.params.id, userId: req.user._id })
  res.json({ ok: true })
})

module.exports = router
