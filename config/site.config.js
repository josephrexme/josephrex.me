require('dotenv').config()

const ENV = {
  current: process.env.ELEVENTY_ENV,
  isDev: process.env.ELEVENTY_ENV === "development",
  isProd: process.env.ELEVENTY_ENV === "production",
}

module.exports = {
  name: 'Joseph Rex',
  username: 'josephrexme',
  title: "Joseph Rex's website - Portfolio, Resume, Designs, and Publications",
  bio: 'voyaging the boundaries of interfaces and interactions',
  topics: 'CSS, JavaScript, Ruby, 3D, XR, Animation, Design, and Finance',
  about: 'Joseph is a **software engineer** at [**ConvertKit**](https://convertkit.com), a **creative technologist** that loves combining art and engineering, and dad to an over-demanding australian shepherd named Glitch.',
  environment: ENV,
  url: ENV.isDev ? 'http://localhost:8080' : 'https://www.josephrex.me',
  language: 'en-us',
  description: 'Articles, designs, experiments, and projects by Joseph Rex',
  author: {
    name: 'Joseph Rex'
  },
  banner: 'https://res.cloudinary.com/strich/image/upload/v1615337400/JR-Logo_eigvmk.png',
  themeColor: '#b64f44',
  social: {
    twitter: 'https://twitter.com/josephrexme',
    linkedin: 'https://www.linkedin.com/in/josephrexme',
    github: 'https://github.com/josephrexme',
    dribbble: 'https://dribbble.com/josephrexme',
    codepen: 'https://codepen.io/josephrexme',
    patreon: 'https://patreon.com/josephrexme',
  },
  convertkitFormId: 1526099,
  googleAnalytics: 'UA-56161232-2'
}