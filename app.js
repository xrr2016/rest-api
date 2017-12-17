const express = require('express')
const app = express()

const routes = require('./routes')

app.use('/products', routes.productRoutes)
app.use('/orders', routes.orderRoutes)

app.use((req, res, next) => {
  res.status(200).json({
    message: 'It works!'
  })
})

module.exports = app