require('dotenv').config()
const chromium = require('chrome-aws-lambda')

const createPDF = async ({ url = 'https://resume.josephrex.me' }) => {
  let browser
  const executablePath = process.env.CHROME_EXEC_PATH || await chromium.executablePath
  try {
    console.log('before launch')
    console.log({ args: chromium.args, executablePath, viewport: chromium.defaultViewport, headless: chromium.headless })
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
    console.log('after launch')
    const page = await browser.newPage()
    console.log('after new page')
    await page.goto(url)
    console.log('after goto url')
    // const pdf = await page.pdf({ format: 'A4' })
    const pdf = await page.screenshot()
    console.log('after screenshot')
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
      // 'Content-Type': 'application/pdf',
      'Content-Type': 'image/png',
      'Cache-control': `public, max-age=${30}`
    },
    body: Buffer.from(pdf).toString('base64')
  }
}
