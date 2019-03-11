const config = require('./infra/config')
const createLogger = require('./infra/logger')
const statsd = require('./infra/statsd')
const createAndConfigureApp = require('./app')
const createHelloService = require('./services/hello')

const log = createLogger(module)
config.logCurrentConfig(log)

const helloService = createHelloService({
  log,
  config,
  statsd
})

const {startApp} = createAndConfigureApp({helloService, log, config, statsd})

setupProcessHooks()

startApp()
  .then(() => {
    statsd.increment('started')
    log.info('Service is up')
  })
  .catch(err => {
    log.error('Startup error', err)
    exitProcessWithError('Startup error')
  })

function setupProcessHooks () {
  process.on('uncaughtException', (err) => {
    log.error('Uncaught exception', err)
    exitProcessWithError('Uncaught exception')
  })

  process.on('SIGINT', () => {
    exitProcessWithError('SIGINT received, shutting down app')
  })
}

function exitProcessWithError (errorMsg) {
  statsd.increment('stopped')
  log.error('Shutting down app: ', errorMsg)
  process.exit(1)
}
