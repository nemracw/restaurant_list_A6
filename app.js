// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurantList = require('./restaurant.json').results

// set up data base
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-data', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// routes setting
// main page
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurant => res.render("index", { restaurant , style: 'index.css' }))
    .catch(err => console.log(err))
})

// show page  
// show restaurant page detail 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const reqID = req.params.restaurant_id
  return Restaurant.findById(reqID)
    .lean()
    .then((restaurant) => { res.render('show', { 
        restaurant, 
        style: 'show.css' 
      }) })
    .catch(err => console.log(err));
})

// search page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const enteredKeywords = req.query.keyword

  const searchedRestaurant = restaurantList.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  )

  res.render('index', {
    restaurant: searchedRestaurant,
    enteredKeywords,
    style: 'index.css'
  })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})