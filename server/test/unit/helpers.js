module.exports = {
  getFakeConfig (keyValuesMap) {
    return {
      get (key) {
        return keyValuesMap[key]
      },
      logCurrentConfig () {}
    }
  },
  getFakeLog () {
    return {
      error () {},
      warn () {},
      info () {},
      debug () {}
    }
  },
  getFakeStatsd () {
    return {
      histogram () {},
      increment () {},
      gauge () {},
      trackSqlQueryTime () {}
    }
  }
}
