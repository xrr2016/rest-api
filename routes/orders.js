const express = require('express')
const router = express.Router()

router
  .route('/')
  .get((req, res, next) => {
    res.status(200).json({ message: 'get orders.' })
  })
  .post((req, res, next) => {
    res.status(201).json({ message: 'add order.' })
  })

router
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id
    res.status(200).json({ message: `you found a ${id} order.`, id })
  })
  .delete((req, res, next) => {
    const id = req.params.id
    res.status(200).json({ message: `you delete the ${id} order.`, id })
  })

module.exports = router
