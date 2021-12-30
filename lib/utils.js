const { DateTime } = require('luxon')

const formatDate = (dateObj, format = 'DATE_FULL') => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime[format])
}

const formatISO = dateObj => DateTime.fromJSDate(dateObj).toISO()

const pluralize = (word, count, inclusive) => {
  const final = count === 1 ? word : `${word}s`
  if(!inclusive) return final
  return `${count} ${final}`
}

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const namify = words => words.split(' ').map(word => capitalize(word)).join(' ')

module.exports = {
  capitalize,
  formatDate,
  formatISO,
  namify,
  pluralize
}
