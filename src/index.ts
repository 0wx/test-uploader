import express from 'express'
import axios from 'axios'
import isUrl from 'is-url'
import { uploader } from './lib/postimage'

const app = express()
app.get('/', (req, res) => {
  axios.get('https://postimg.cc')
  .then(() => {
  res.json({ok: true})  
  }).
  catch(() => res.json({ok: false}))
  
})
app.get('*', async (req, res) => {
  const url = req.originalUrl.replace('/', '')
  
  try {
    if(!isUrl(url)) throw new Error('Not URL')
    const data = await uploader(url)
    res.json({ url: data })
  } catch (error) {
    res.status(500).json({ error })
  }
})
console.log(process.env.PORT)
app.listen(process.env.PORT)