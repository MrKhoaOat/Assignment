const mongoose = require('mongoose')
const Schema = mongoose.Schema



const userSchema = new Schema({
    username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  token: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now,
    trim: true,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User