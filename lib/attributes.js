module.exports = options => {
  return Object.keys(options).reduce((result, attribute, index) => {

    const prefix = index === 0 ? '' : ' '
    return result.concat(`${prefix}${attribute}="${options[attribute]}"`)
  }, '')
}

