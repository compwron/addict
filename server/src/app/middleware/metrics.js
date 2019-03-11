const connectDatadog = require('connect-datadog')

module.exports = createMetricsMiddleware

function createMetricsMiddleware (statsd) {
  const datadogOptions = {
    'dogstatsd': statsd,
    'response_code': true,
    'stat': 'web'
  }
  return connectDatadog(datadogOptions)
}
