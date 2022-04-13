const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    sw: 'service-worker.js',
		buildExcludes: [/middleware-manifest.json$/]
  },
  env: {
    apiURL: process.env.API_URL,
    googleAPI: process.env.GOOGLE_API
  }
  // Use process.env.apiURL to access env in your codebase
})