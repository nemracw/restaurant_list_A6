// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const app = express()
const port = 3000


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
  // main page
app.get('/', (req, res) => {
  res.render('index', {
    restaurant: restaurantList,
    style: 'index.css'
  })
})

  // show page  
app.get('/restaurants/:restaurant_id', (req, res) => {
  const reqID = req.params.restaurant_id
  const restaurantData = restaurantList.find(
    restaurant => restaurant.id.toString() === reqID
  )
  res.render('show', { 
      restaurant: restaurantData,
      style: 'show.css'
    })
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