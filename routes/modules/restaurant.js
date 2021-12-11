const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show page : show restaurant page detail 
router.get('/restaurants/:restaurant_id', (req, res) => {
  const reqID = req.params.restaurant_id
  return Restaurant.findById(reqID)
    .lean()
    .then((restaurant) => {
      res.render('show', {
        restaurant,
        style: 'show.css'
      })
    })
    .catch(err => console.log(err));
})

// add new restaurant data
router.get('/restaurant/new', (req, res) => {
  res.render('new')
})
router.post('/restaurants', (req, res) => {
  const new_res = req.body
  return Restaurant.create(new_res).then(() => res.redirect('/')).catch(err => console.error(err))
})

//edit restaurant data
// add edit feature
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).lean().then(restaurant => res.render('edit', { restaurant })).catch(err => console.error(err))
})
router.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const edit_res = req.body
  return Restaurant.findById(id).then(restaurant => {
    restaurant.name = edit_res.name;
    restaurant.category = edit_res.category;
    restaurant.image = edit_res.image;
    restaurant.location = edit_res.location;
    restaurant.phone = edit_res.phone;
    restaurant.google_map = edit_res.google_map;
    restaurant.rating = edit_res.rating;
    restaurant.description = edit_res.description;
    return restaurant.save()
  }).then(() => {
    res.redirect(`/`)
  }).catch(err => console.log(err))
})

//delete page
router.delete('/restaurants/:id', (req, res) => {
  console.log(req.params)
  const id = req.params.id
  return Restaurant.findById(id).then(restaurant => {
    restaurant.remove()
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})

// search function
router.get('/search', (req, res) => {
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

module.exports = router