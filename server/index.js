require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const showsRoutes = require('./routes/shows')
const watchlistRoutes = require('./routes/watchlist')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/shows', showsRoutes)
app.use('/api/watchlist', watchlistRoutes)

app.get('/', (req, res) => res.send({ ok: true, message: 'Anime Tracker API' }))

const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log('Server running on', PORT))
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
