const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  prod_img: {
    type: String,
    trim: true,
    unique: true,
  },
  prod_name: {
    type: String,
    required: [true, 'Product must have name'],
    trim: true,
    unique: true,
  },
  prod_desc: {
    type: String,
    trim: true,
  },
  prod_price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
  },
  prod_brand: {
    type: String,
    trim: true,
  },
  prod_type: {
    type: String,
    trim: true,
  },
  prod_pack: {
    type: Number,
    required: [true, 'Product is required'],
    trim: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
    trim: true,
  },
})

const Products = mongoose.model('Products', productSchema)

module.exports = Products