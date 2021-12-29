import express from 'express'
import { uploader } from './lib/postimage'

const app = express()
app.get('*', async (req, res) => {
  const url = req.originalUrl.replace('/', '')
  try {
    const data = await uploader(url)
    res.json({ url: data })
  } catch (error) {
    res.status(500).json({ error })
  }
})
