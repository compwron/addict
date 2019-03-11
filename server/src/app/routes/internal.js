const express = require('express')
const internalRoutes = require('acuris-express-internal-routes')

module.exports = createInternalRouter

function createInternalRouter ({config, log}) {
  const router = internalRoutes.createInternalRouter({express, mountPath: '/'})

  router.get('/log-config', (req, res) => {
    config.logCurrentConfig(log)
    res.send('Current config written to logs')
  })

  router.get('/simulate-error', (req, res) => {
    throw new Error('this is a simulated error, someone hit /internal/simulate-error, nothing bad actually happened')
  })

  return router
}
