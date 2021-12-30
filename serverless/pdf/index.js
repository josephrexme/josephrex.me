const puppeteer = require('puppeteer')

const createPDF = async ({ url = 'https://resume.josephrex.me' }) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const pdf = await page.pdf({ format: 'A4' })
  await browser.close()
  return pdf
}

exports.handler = async function(event) {
  const { queryStringParameters } = event
  const pdf = await createPDF(queryStringParameters)
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Cache-control': `public, max-age=${30}`
    },
    body: Buffer.from(pdf).toString('base64')
  }
}
