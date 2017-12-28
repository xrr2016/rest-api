const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router
  .route('/')
  .get((req, res, next) => {
    Product
      .find({})
      .exec()
      .then(products => {
        res
          .status(200)
          .json(products)
      })
      .catch(error => {
        console.log(error)
        res
          .status(500)
          .json({error})
      })
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
          .json(result)
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
          res
            .status(404)
            .json({message: 'Not product found!'})
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
    // const updates = {} for (const key in req.body) {   updates[key] =
    // req.body[key] }
    console.log(req.body)
    Product.update({
      _id: id
    }, {$set: req.body})
      .exec()
      .then(result => {
        res
          .status(200)
          .json(result)
      })
      .catch(error => {
        res
          .status(500)
          .json(error)
      })
  })
  .delete((req, res, next) => {
    const id = req.params.id
    Product
      .remove({_id: id})
      .exec()
      .then(result => {
        res
          .status(200)
          .json(result)
      })
      .catch(error => {
        res
          .status(500)
          .json(error)
      })
  })

module.exports = router
