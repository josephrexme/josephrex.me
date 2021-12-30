require('dotenv').config()
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const createPDF = async ({ url = 'https://resume.josephrex.me' }) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXEC_PATH || await chromium.executablePath,
      headless: chromium.headless,
    })
    const page = await browser.newPage()
    await page.goto(url)
    const pdf = await page.pdf({ format: 'A4' })
    await browser.close()
    return pdf
  } catch (error) {
    console.error(error)
    return [0]
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
