'use strict'
require('must/register')
const sanitizeUrl = require('./../../../src/helpers/sanitizeUrl')

describe('Sanitize url', function () {
  it('can parse a rabbitmq url', function () {
    const urlTpParse = 'amqps://fahri:legend@orange-wasp.rmq.cloudamqp.com:5671/intelligence-store-service-ci'
    sanitizeUrl(urlTpParse).must.eql('amqps://****@orange-wasp.rmq.cloudamqp.com:5671/intelligence-store-service-ci')
  })
  it('can parse an HTTP protocol url', function () {
    const urlTpParse = 'https://fahri:legend@8fed639d42124d70ea08d9c5a8c9bff2.eu-west-1.aws.found.io:9243'
    sanitizeUrl(urlTpParse).must.eql('https://****@8fed639d42124d70ea08d9c5a8c9bff2.eu-west-1.aws.found.io:9243/')
  })
  it('can parse a url with no username and password', function () {
    const urlTpParse = 'https://8fed639d42124d70ea08d9c5a8c9bff2.eu-west-1.aws.found.io:9243'
    sanitizeUrl(urlTpParse).must.eql('https://8fed639d42124d70ea08d9c5a8c9bff2.eu-west-1.aws.found.io:9243/')
  })
  it('can parse a string', function () {
    const urlTpParse = 'abc'
    sanitizeUrl(urlTpParse).must.eql('abc')
  })
})
