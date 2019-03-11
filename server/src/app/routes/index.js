const express = require('express')

const createInternalRouter = require('./internal')
const createHelloRouter = require('./hello')

module.exports = createRouter

function createRouter (options) {
  const router = express.Router()

  router.use('/internal', createInternalRouter(options))
  router.use('/', createHelloRouter(options))

  return router
}
