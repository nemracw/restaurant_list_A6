// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// main page
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurant => res.render("index", { restaurant, style: 'index.css' }))
    .catch(err => console.log(err))
})



// 匯出路由模組
module.exports = router