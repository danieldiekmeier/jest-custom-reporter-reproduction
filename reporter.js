class MetricReporter {
  async onRunComplete(_testContexts, results) {
    if (results.coverageMap) {
      console.log('> results.coverageMap is already set:', results.coverageMap)
      return
    }
    
    console.log(
      '> Starting in Jest 28, custom reporters run BEFORE the built-in CoverageReporter.'
    )
    console.log('> At the moment, results.coverageMap is:', results.coverageMap)

    // Starting in Jest 28, custom reporters run BEFORE the built-in CoverageReporter.
    console.log('> Waiting for CoverageReporter ...')
    const waitForCoverageInterval = setInterval(() => {
      if (!results.coverageMap) return

      console.log('> Got results from CoverageReporter after polling!')
      console.log('>', results.coverageMap.getCoverageSummary().toJSON().lines)
      clearInterval(waitForCoverageInterval)
    }, 200)
  }
}

module.exports = MetricReporter
