export default {
  metrics: function({ pvuv }) {
    return pvuv
  },
  dimensions: 'ga:source',
  sort: function({ metrics }) {
    return metrics === 'ga:pageviews,ga:users'
      ? '-ga:pageviews'
      : `-${metricsStr}`
  },
}
