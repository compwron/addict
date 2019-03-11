const convict = require('convict')
// const sanitizeUrl = require('./../helpers/sanitizeUrl')
const config = getConfig()
config.validate({ allowed: 'strict' })

module.exports = config
module.exports.logCurrentConfig = logCurrentConfig

function getConfig () {
  return convict({
    nodeEnv: {
      doc:
        'Running in an environment, or on a developer machine? Mainly used to decide log structure etc',
      format: ['production', 'dev'],
      env: 'NODE_ENV',
      default: 'production'
    },
    env: {
      doc: 'The deployment environment',
      format: ['ci', 'qa', 'aslive', 'live', 'local'],
      env: 'ENV_NAME',
      default: 'local'
    },
    componentName: {
      doc: 'Component name to use in metrics and logging',
      format: String,
      env: 'COMPONENT_NAME',
      default: 'internal-user-service'
    },
    port: {
      doc: 'Port for starting the app on.',
      format: 'port',
      env: 'PORT',
      default: 8000
    },
    logLevel: {
      doc: 'Log level to start logging at.',
      format: ['debug', 'info', 'warn', 'error'],
      env: 'LOG_LEVEL',
      default: 'debug'
    },
    statsd: {
      enabled: {
        doc: 'Whether to send metrics to a StatsD server',
        format: Boolean,
        env: 'STATSD_ENABLED',
        default: false
      },
      host: {
        doc: 'StatsD server host',
        format: String,
        env: 'STATSD_HOST',
        default: 'localhost'
      },
      port: {
        doc: 'StatsD server port',
        format: 'port',
        env: 'STATSD_PORT',
        default: 8125
      }
    }
  })
}
function logCurrentConfig (log = console) {
  const configToLog = JSON.parse(config.toString())
  // We must sanitize username and password from connection strings. for ex: Elastic, rabbit..
  // configToLog.elasticsearch.baseurl = sanitizeUrl(configToLog.elasticsearch.baseurl)
  // configToLog.rabbitmq.uri = sanitizeUrl(configToLog.rabbitmq.uri)
  log.info('Current config: %s', configToLog)
}
