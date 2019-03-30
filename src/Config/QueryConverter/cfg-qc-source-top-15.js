export default {
  metrics: function({ pvuv }) {
    return pvuv
  },
  dimensions: 'ga:source',
  sort: function({ metrics, selectorData: { workingDate } }) {
    if (workingDate) return 'ga:source'
    return metrics === 'ga:pageviews,ga:users' ? '-ga:pageviews' : `-${metrics}`
  },
}
