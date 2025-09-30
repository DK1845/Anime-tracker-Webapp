const express = require('express')
const Show = require('../models/Show')
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/auth')

const router = express.Router()

// GET /api/shows
router.get('/', async (req, res) => {
  const shows = await Show.find().sort({ title: 1 })
  res.json(shows)
})

// GET /api/shows/:id
router.get('/:id', async (req, res) => {
  const show = await Show.findById(req.params.id)
  if (!show) return res.status(404).json({ error: 'Not found' })
  res.json(show)
})

// Admin: create
router.post('/', auth, isAdmin, async (req, res) => {
  const s = await Show.create(req.body)
  res.json(s)
})

// Admin: update
router.put('/:id', auth, isAdmin, async (req, res) => {
  const s = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(s)
})

// Admin: delete
router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Show.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

module.exports = router
