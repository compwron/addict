const request = require('supertest')
const demand = require('must')
const helpers = require('./helpers')
let app

describe('app has routes', () => {
  beforeEach(() => {
    configureAppWithFakes()
  })

  describe('addition', () => {
    it('knows what one and one makes', () => {
      demand(1 + 1).to.equal(2)
    })
  })

  describe('GET /internal/healthcheck', () => {
    it('returns status code 200', done => {
      request(app)
        .get('/internal/healthcheck')
        .expect(200, done)
    })
  })

  describe('GET /internal/log-config', () => {
    it('returns a 200 status code and an info message', done => {
      request(app)
        .get('/internal/log-config')
        .expect(200, 'Current config written to logs', done)
    })
  })
})

function configureAppWithFakes () {
  const createAndConfigureApp = require('../../src/app')
  app = createAndConfigureApp({
    log: helpers.getFakeLog(),
    config: helpers.getFakeConfig(),
    statsd: helpers.getFakeStatsd()
  }).app
}
