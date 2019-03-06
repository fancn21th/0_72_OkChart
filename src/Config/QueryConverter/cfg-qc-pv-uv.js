export default {
  metrics: 'ga:pageviews,ga:users',
  dimensions: function ({
    timeUnit
  }) {
    return `ga:${timeUnit || 'date'}`
  },
}
