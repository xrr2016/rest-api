const express = require('express')
// const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const routes = require('./routes')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/products', routes.productRoutes)
app.use('/orders', routes.orderRoutes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origion', '*')
  res.header('Access-Control-Allow-Headers', 'Origion, X-Requset-With, Content-type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allows-Methods', 'PUT, POST, PATCH, DELETE, GET')
    res.status(200).json({})
  }
  next()
})

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