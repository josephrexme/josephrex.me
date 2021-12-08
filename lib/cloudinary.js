const transform = (transform, str, value) => {
  const [fragmentA, fragmentB] = str.split('/upload/')
  const splitted = fragmentB.split('/')
  if(splitted.length === 2) {
    return `${fragmentA}/upload/${splitted[0]},${transform}${value}/${splitted[1]}` 
  }
  return `${fragmentA}/upload/${transform}${value}/${fragmentB}`
}

const format = (name, ext) => {
  return `${name}.${ext}`
}

// Behaves similar to https://npmjs.com/package/cloudinary's cloudinary.image()
module.exports = function(uri, options) {
  const transforms = {
    crop(str, value) {
      if(!value) return str
      return transform('c_', str, value)
    },
    width(str, value) {
      if(!value) return str
      return transform('w_', str, value)
    },
    angle(str, value) {
      if(!value) return str
      return transform('a_', str, value)
    },
    quality(str, value) {
      if(!value) return str
      return transform('q_', str, value)
    }
  }
  return Object.keys(options).filter(name => name !== 'format').reduce((acc, result) => {
    return transforms[result](acc, options[result])
  }, `https://res.cloudinary.com/strich/image/upload/${format(uri, options.format || 'jpg')}`)
}
