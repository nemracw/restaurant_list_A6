const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < restaurantList.length; i++) {
    const list = restaurantList[i]
    restaurant.create({
      id: list.id,
      name: list.name,
      category: list.category,
      image: list.image,
      location: list.location,
      phone: list.phone,
      google_map: list.google_map,
      rating: list.rating,
      description: list.description
    })
  }
  console.log('data entry done')

})



