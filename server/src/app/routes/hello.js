const express = require('express')
const createMetricsMiddleware = require('../middleware/metrics')

module.exports = createRouter

function createRouter ({statsd, helloService, log}) {
  const router = express.Router()

  router.get('/', createMetricsMiddleware(statsd), (req, res) => {
    res.send(helloService.sayHello())
  })

  router.all('/', (req, res) => {
    res.sendStatus(405)
  })

  return router
}
