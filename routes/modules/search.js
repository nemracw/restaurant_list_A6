const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// search function
router.get('/', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filtered_restaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keywords) || restaurant.category.toLowerCase().includes(keywords));
      res.render('index', {
        restaurant: filtered_restaurant,
        keyword: keywords,
        filter_length: filtered_restaurant.length,
        style: 'index.css'
      });
    }).catch(err => console.log(err))
})


// 匯出路由模組
module.exports = router