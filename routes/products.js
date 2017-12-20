const express = require('express')
const router = express.Router()

router
  .route('/')
  .get((req, res, next) => {
    res
      .status(200)
      .json({message: 'get products.'})
  })
  .post((req, res, next) => {
    const product = {
      name: req.body.name,
      price: req.body.price
    }
    res
      .status(201)
      .json({message: 'post products.', createdProduct: product})
  })

router
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id
    if (id === 'secret') {
      res
        .status(200)
        .json({message: 'you found a secret product.', id})
    } else {
      res
        .status(200)
        .json({message: `you found the ${id} product.`, id})
    }
  })
  .patch((req, res, next) => {
    const id = req.params.id
    res
      .status(200)
      .json({message: `you update the ${id} product.`, id})
  })
  .delete((req, res, next) => {
    const id = req.params.id
    res
      .status(200)
      .json({message: `you delete the ${id} product.`, id})
  })

module.exports = router
