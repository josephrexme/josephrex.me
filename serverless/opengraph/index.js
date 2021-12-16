const { createCanvas, registerFont } = require('canvas')

function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  return words.reduce((accumulator, word, index) => {
    const sep = index === 0 ? '' : ' '
    const lastLine = accumulator.slice(-1)[0]
    const width = ctx.measureText(`${lastLine || ''}${sep}${word}`).width
    if(width < maxWidth) {
      return [...accumulator.slice(0, -1), `${lastLine || ''}${sep}${word}`]
    }
    return [...accumulator, word]
  }, []);
}

function write(text, ctx, x, y) {
  registerFont('serverless/opengraph/OpenSans-Regular.ttf', { family: 'Open Sans' })
  const maxWidth = 520
  ctx.font = "600 24px Open Sans"
  ctx.fillStyle = "#ffffff"
  ctx.textBaseline = "middle"

  // wrap each line when max width is reached
  const lines = getLines(ctx, text, maxWidth)
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * 30, maxWidth)
  })
}

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const createImage = ({ text = '' }) => {
  const [width, height] = [600, 300]
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "#252525"
  ctx.fillRect(0, 0, width, height)
  write(capitalize(text.replace(/-/g, ' ')), ctx, 40, 200)
  const buffer = canvas.toBuffer("image/jpeg", { quality: 0.80 })
  return buffer
}

exports.handler = async function(event) {
  const { queryStringParameters } = event
  const image = createImage(queryStringParameters)
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-control': `public, max-age=${60 * 60 * 24 * 1}` // 1 day cache
    },
    body: Buffer.from(image).toString('base64')
  }
}

