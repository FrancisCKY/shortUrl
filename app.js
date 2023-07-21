const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const port = 3000

require("dotenv").config()
const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useUnifiedTopology: true })
  .then(() => {
    console.log('ok')
  })
  .catch((error) => {
    console.log(error)
  })

app.use(express.static('public'))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.urlencoded({ extended: false })); /*  目的是使用 express.urlencoded() 中介軟體，以解析從客戶端（瀏覽器）送來的 URL 編碼的資料  */

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/detail', async (req, res) => {
  await ShortUrl.create({ full: req.body.detail })
  res.redirect('/detail')
})

app.get('/detail', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.query.detail })
  res.render('detail', { shortUrl: shortUrl })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
