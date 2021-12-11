// require packages used in the project
const express = require('express')  //載入 express 
const port = 3000 // 設定連接埠
const exphbs = require('express-handlebars')// 引用 express-handlebars
const Restaurant = require('./models/restaurant')// 載入 restaurant model
const restaurantList = require('./restaurant.json').results // 載入 restaurant.json

const routes = require('./routes')
const app = express() //建構應用程式伺服器

// setting database
const mongoose = require('mongoose')  // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-data', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //建立一個名為hbs的樣板引擎
app.set('view engine', 'hbs') //把hbs元拿正式掛載到主程式裡，開始啟用

// setting static files
app.use(express.static('public'))

// set body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

// routes setting



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})