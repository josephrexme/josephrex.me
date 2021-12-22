exports.handler = async function() {
  // hidding email from bots
  const names = { first: 'joseph', last: 'rex', middle: 't' }
  const provider = 'gmail.com'
  const constructedEmail = `${Object.values(names).join('.')}@${provider}`
  return {
    statusCode: 301,
    headers: {
      'Cache-control': 'public, max-age=0, must-revalidate',
      'location': `mailto:${constructedEmail}`
    },
  }
}
