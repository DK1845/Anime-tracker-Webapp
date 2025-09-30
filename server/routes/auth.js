const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  const existing = await User.findOne({ email })
  if (existing) return res.status(400).json({ error: 'Email already in use' })
  const passwordHash = await bcrypt.hash(password, 10)
  const u = await User.create({ name, email, passwordHash })
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: { id: u._id, name: u.name, email: u.email, role: u.role }, token })
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const u = await User.findOne({ email })
  if (!u) return res.status(400).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, u.passwordHash)
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: { id: u._id, name: u.name, email: u.email, role: u.role }, token })
})

module.exports = router
