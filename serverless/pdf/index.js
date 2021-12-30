const chromium = require('chrome-aws-lambda')

const createPDF = async ({ url = 'https://resume.josephrex.me' }) => {
  const envOptions = process.env.ELEVENTY_ENV === 'production' ? {
    executablePath: await chromium.executablePath,
  } : {}
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    ...envOptions
  })
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
