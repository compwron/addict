'use strict'

const url = require('url')

function sanitizeUrl (urlToParse) {
  const parsedUrl = url.parse(urlToParse)
  if (parsedUrl.auth) {
    parsedUrl.auth = '****'
  }
  return url.format(parsedUrl)
}

module.exports = sanitizeUrl
