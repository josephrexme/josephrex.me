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

module.exports = {
  formatDate,
  formatISO,
  pluralize
}
