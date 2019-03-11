module.exports = setErrorHandlers

function setErrorHandlers ({app, log, statsd}) {
  app.all('*', (req, res) => {
    res.sendStatus(404)
  })

  app.use((err, req, res, next) => {
    log.error('Express error caught', err)
    statsd.increment('error')
    res.sendStatus(500)
  })
}
