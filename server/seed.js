require('dotenv').config()
const mongoose = require('mongoose')
const Show = require('./models/Show')
const User = require('./models/User')
const bcrypt = require('bcryptjs')

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  await Show.deleteMany({})
  await User.deleteMany({})

  await Show.create([{
    title: 'Naruto',
    synopsis: 'A young ninja...',
    posterUrl: 'https://placehold.co/300x420?text=Naruto',
    episodes: 220,
    genres: ['Action', 'Adventure'],
    year: 2002
  }, {
    title: 'One Piece',
    synopsis: 'A long-running pirate adventure...',
    posterUrl: 'https://placehold.co/300x420?text=One+Piece',
    episodes: 1000,
    genres: ['Action', 'Adventure'],
    year: 1999
  }])

  const passwordHash = await bcrypt.hash('password', 10)
  await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' })
  await User.create({ name: 'Demo', email: 'demo@example.com', passwordHash, role: 'user' })

  console.log('Seeded')
  process.exit(0)
}
run()
