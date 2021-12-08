const outdent = require('outdent')
const cloudinary = require('./cloudinary')
const toAttributes = require('./attributes')

module.exports = function(name, attributes) {
  const { format, crop, angle, quality, ...attrs } = attributes || { alt: "banner", width: 650, height: 259 }
  return outdent`
  <picture>
    <source type="image/webp" media="(max-width: 799px)" srcset="${cloudinary(name, { format: 'webp', width: 480, crop: 'scale', angle, quality })}">
    <source type="image/webp" media="(min-width: 800px)" srcset="${cloudinary(name, { format: 'webp', width: attrs.width || 800, crop: crop || 'scale', angle, quality })}">
    <source type="image/jpeg" media="(max-width: 799px)" srcset="${cloudinary(name, { format, width: 480, crop: 'scale', angle, quality })}">
    <source type="image/jpeg" media="(min-width: 800px)" srcset="${cloudinary(name, { format, width: attrs.width || 800, crop: crop || 'scale', angle, quality })}">
    <img src="${cloudinary(name, { format, width: attrs.width || 800, crop: crop || 'scale', angle })}" alt="${attrs.alt}" ${attrs ? toAttributes(attrs) : ''}>
  </picture>
  `
}
