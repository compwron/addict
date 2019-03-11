'use strict'

const sinon = require('sinon')
require('must/register')

const createHelloService = require('../../src/services/hello')
const helpers = require('./helpers')

describe('hello service', () => {
  describe('sayHello', () => {
    it('returns a greeting, logs something, sends a metric', () => {
      // arrange
      const fakeConfig = helpers.getFakeConfig({componentName: 'my-component'})
      const fakeLog = helpers.getFakeLog()
      const fakeStatsd = helpers.getFakeStatsd()
      const logInfoSpy = sinon.spy(fakeLog, 'info')
      const statsdIncrSpy = sinon.spy(fakeStatsd, 'increment')

      const helloService = createHelloService({
        config: fakeConfig,
        log: fakeLog,
        statsd: fakeStatsd
      })

      // act
      const message = helloService.sayHello()

      // assert
      message.must.eql("Hello, I'm ES6 my-component - new and shiny!")
      logInfoSpy.calledOnce.must.be.true()
      statsdIncrSpy.calledOnce.must.be.true()
    })
  })
})
