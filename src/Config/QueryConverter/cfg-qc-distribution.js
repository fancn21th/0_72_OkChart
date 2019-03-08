export default {
  metrics: function ({
    pvuv
  }) {
    return pvuv
  },
  dimensions: function ({
    countryBrowser
  }) {
    return countryBrowser
  },
  sort: function ({
    metrics,
    workingDate
  }) {
    if (workingDate) return 'ga:pageviews'
    return metrics === 'ga:pageviews,ga:users' ? '-ga:pageviews' : `-${metrics}`
  },
}
