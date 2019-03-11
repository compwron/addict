module.exports = createHelloService

function createHelloService ({config, log, statsd}) {
  return {
    sayHello () {
      log.info('saying hello')
      statsd.increment('service.hello', ['operation:saying-hello'])
      return `Hello, I'm ES6 ${config.get('componentName')} - new and shiny!`
    }
  }
}
