export default {
  metrics: function({ pvuv }) {
    return pvuv
  },
  dimensions: 'ga:source',
  sort: function({ metrics, workingDate }) {
    if (workingDate) return 'ga:source'
    return metrics === 'ga:pageviews,ga:users' ? '-ga:pageviews' : `-${metrics}`
  },
}
