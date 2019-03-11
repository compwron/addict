'use strict'

const _ = require('lodash')
const StatsD = require('node-statsd').StatsD
const config = require('./config')
const log = require('./logger')(module)

let statsd
if (config.get('statsd.enabled')) {
  const statsdConfig = buildStatsdConfig()
  statsd = new StatsD(statsdConfig)
  log.info('Metrics collection is enabled. STATSD config: ', statsdConfig)
} else {
  statsd = buildDummyStatsdObject()
  log.info('Metrics collection is disabled.')
}

statsd.trackHttpResponseTime = trackHttpResponseTime
statsd.trackSqlConnectTime = trackSqlConnectTime
statsd.trackSqlQueryTime = trackSqlQueryTime
module.exports = statsd

function trackHttpResponseTime (responseTime, httpCallee, operation, status) {
  const tags = joinKeysAndValues(['http_callee', httpCallee, 'operation', operation, 'status', status])
  statsd.histogram('http_client.response_time_ms', responseTime, tags)
}

function trackSqlConnectTime (connectTime, db) {
  const tags = joinKeysAndValues(['db', db])
  statsd.histogram('sql.connect_time_ms', connectTime, tags)
}

function trackSqlQueryTime (queryTime, db, operation, productId = '0') {
  const tags = joinKeysAndValues(['db', db, 'operation', operation, 'product_id', productId])
  statsd.histogram('sql.query_time_ms', queryTime, tags)
}

function buildStatsdConfig () {
  return {
    host: config.get('statsd.host'),
    port: config.get('statsd.port'),
    prefix: 'app.',
    global_tags: [
      'env:' + config.get('env') || 'unknown-env',
      'component:' + config.get('componentName')
    ]
  }
}

function buildDummyStatsdObject () {
  return {
    histogram: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing histogram with params')
      log.debug.apply(log, params)
    },
    increment: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing increment with params')
      log.debug.apply(log, params)
    },
    gauge: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing gauge with params')
      log.debug.apply(log, params)
    }
  }
}

function joinKeysAndValues (keysAndValues) {
  if (keysAndValues.length % 2 !== 0) throw new Error('there are not an even number of keys and values')

  const output = []
  const chunks = _.chunk(keysAndValues, 2)

  for (const chunk in chunks) {
    if (chunks.hasOwnProperty(chunk)) {
      output.push([chunks[chunk][0], chunks[chunk][1]].join(':'))
    }
  }
  return output
}
