const { createCanvas, registerFont, loadImage } = require('canvas')

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

function write(text, ctx, x, y, maxWidth) {
  ctx.font = "600 46px Open Sans"
  ctx.fillStyle = "#ffffff"
  ctx.textBaseline = "middle"
  const lineHeight = 55

  // wrap each line when max width is reached
  const lines = getLines(ctx, text, maxWidth)
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight, maxWidth)
  })
}

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
const perc = (percentage, value) => percentage / 100 * value

const simple = async (img) => {
  const [width, height] = [200, 200]
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "#b64f44"
  ctx.fillRect(0, 0, width, height)
  const size = 120
  ctx.drawImage(img, (width / 2) - (size / 2), (height / 2) - (size / 2), size, size)
  return canvas.toBuffer("image/jpeg", { quality: 0.80 })
}

const descriptive = async (text, img) => {
  const [width, height] = [1200, 630]
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")
  const imageSize = 160
  ctx.fillStyle = "#252525"
  ctx.fillRect(0, 0, width, height)
  const padding = 40
  const maxWidth = width - padding * 2
  ctx.drawImage(img, padding, padding, imageSize, imageSize)
  ctx.save()
  ctx.shadowColor = 'black'
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 15
  ctx.shadowOffsetY = 10
  ctx.font = "bold 32px Open Sans"
  ctx.fillStyle = "#b64f44"
  const website = 'www.josephrex.me'
  ctx.fillText(website, width - ctx.measureText(website).width - padding, padding + imageSize / 2)
  ctx.restore()
  ctx.beginPath()
  ctx.moveTo(0, perc(50, height))
  ctx.bezierCurveTo(perc(20, width), perc(30, height), perc(60, width), perc(80, height), width, perc(40, height))
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()
  ctx.fillStyle = "#b64f44"
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(0, perc(50, height))
  ctx.bezierCurveTo(perc(20, width), perc(30, height), perc(60, width), perc(70, height), width, perc(40, height))
  ctx.bezierCurveTo(perc(80, width), perc(78, height), perc(18, width), perc(40, height), 0, perc(50, height))
  ctx.closePath()
  ctx.fillStyle = "#72332D"
  ctx.fill()
  write(capitalize(text.replace(/-/g, ' ')), ctx, padding, perc(70, height), maxWidth)
  return canvas.toBuffer("image/jpeg", { quality: 0.80 })
}

const createImage = async ({ text = '', layout }) => {
  registerFont('serverless/opengraph/OpenSans-Regular.ttf', { family: 'Open Sans' })
  const img = await loadImage('https://res.cloudinary.com/strich/image/upload/v1639051030/JR-CodePen_yspcue.svg')

  if(layout === 'list') return await simple(img)
  return await descriptive(text, img)
}

exports.handler = async function(event) {
  const { queryStringParameters } = event
  const image = await createImage(queryStringParameters)
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-control': `public, max-age=${30}`
    },
    body: Buffer.from(image).toString('base64')
  }
}

