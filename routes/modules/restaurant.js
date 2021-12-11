const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// add new restaurant data
router.get('/new', (req, res) => {
  res.render('new')
})

// show page : show restaurant page detail 
router.get('/:restaurant_id', (req, res) => {
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

router.post('', (req, res) => {
  const new_res = req.body
  return Restaurant.create(new_res).then(() => res.redirect('/')).catch(err => console.error(err))
})

// add edit feature
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).lean().then(restaurant => res.render('edit', { restaurant })).catch(err => console.error(err))
})
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id).then(restaurant => {
    restaurant.remove()
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})


// 匯出路由模組
module.exports = router