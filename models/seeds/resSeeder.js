//建立 Seeder 腳本
const restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

const db = mongoose.connection

db.once('open', () => {

  for (let i = 0; i < restaurantList.length; i++) {
    const list = restaurantList[i]
    restaurant.create({
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
  
})



