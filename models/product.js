const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const productSchema = Schema({_id: ObjectId, name: String, proce: Number})

module.exports = mongoose.model('Product', productSchema)