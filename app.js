// require packages used in the project
const express = require('express') 
const port = 3000 
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurantList = require('./restaurant.json').results 
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) 
app.set('view engine', 'hbs') 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})