const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const routes = require('./routes')

app.use(morgan('dev'))
app.use('/products', routes.productRoutes)
app.use('/orders', routes.orderRoutes)


// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   })
// })

app.use((req, res, next) => {
  const err = new Error('Not found!')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})
module.exports = app