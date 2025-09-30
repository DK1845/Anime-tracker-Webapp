const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function auth(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader) return res.status(401).json({ error: 'Missing token' })
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-passwordHash')
    if (!user) return res.status(401).json({ error: 'Invalid token' })
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next()
  return res.status(403).json({ error: 'Admin access required' })
}

module.exports = auth
module.exports.isAdmin = isAdmin
