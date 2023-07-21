const mongoose = require('mongoose')
const shortID = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortID.generate
  }
})

shortUrlSchema.pre('save', function (next) {
  this.sort = shortID.generate().substring(0, 5)
  next()
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)