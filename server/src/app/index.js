const express = require('express')
const morgan = require('morgan')
const setErrorHandlers = require('./set-error-handlers')
const createRouter = require('./routes')

module.exports = createAndConfigureApp

function createAndConfigureApp ({config, log, statsd, helloService}) {
  const app = express()
  const router = createRouter({config, log, statsd, helloService})

  setAccessLogs(app)
  app.use('/', router)
  setErrorHandlers({app, log, statsd})

  return {app, startApp}

  function startApp () {
    return new Promise((resolve, reject) => {
      try {
        const server = app.listen(config.get('port'), () => {
          log.info(`Started on port ${server.address().port}`)
          return resolve()
        })
        server.once('error', err => {
          return reject(err)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

function setAccessLogs (app) {
  const format = ':req[X-Forwarded-For] :method :url HTTP/:http-version :status :res[content-length] - :response-time[1] ms - :user-agent'
  app.use(morgan(format, {
    skip: (req, res) => req.url.toLowerCase().includes('/healthcheck')
  }))
}
