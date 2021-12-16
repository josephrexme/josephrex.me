const { DateTime } = require('luxon')

const cloudinary = require('./cloudinary')
const image = require('./image')
const twitter = require('./twitter')
const toAttributes = require('./attributes')

const formatDate = dateObj => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
}

const formatISO = dateObj => DateTime.fromJSDate(dateObj).toISO()

const pluralize = (word, count, inclusive) => {
  const final = count === 1 ? word : `${word}s`
  if(!inclusive) return final
  return `${count} ${final}`
}

module.exports = {
  cloudinary,
  formatDate,
  formatISO,
  image,
  pluralize,
  toAttributes,
  twitter,
}