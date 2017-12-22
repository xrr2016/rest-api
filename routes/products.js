const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router
  .route('/')
  .get((req, res, next) => {
    res
      .status(200)
      .json({message: 'get products.'})
  })
  .post((req, res, next) => {
    const product = new Product({
      _id: new mongoose
        .Types
        .ObjectId(),
      name: req.body.name,
      price: req.body.price
    })
    product
      .save()
      .then(result => {
        console.log(result)
        res
          .status(201)
          .json({message: 'post products.', result})
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({err})
      })
  })

router
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id
    Product
      .findById(id)
      .exec()
      .then(doc => {
        console.log(doc)
        if (doc) {
          res
            .status(200)
            .json(doc)
        } else {
          res.status(404).json({ message: 'Not product found!'})
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({err})
      })
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
