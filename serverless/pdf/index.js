require('dotenv').config()
const chromium = require('chrome-aws-lambda')

const createPDF = async ({ url = 'https://resume.josephrex.me' }) => {
  let browser
  try {
    browser = await chromium.puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXEC_PATH || await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    await page.goto(url)
    const pdf = await page.pdf({ format: 'A4' })
    return pdf
  } catch (error) {
    console.error(error)
    return [0]
  } finally {
    if(browser) await browser.close()
  }
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
