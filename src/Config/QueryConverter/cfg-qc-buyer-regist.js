export default {
  metrics: 'ga:goal12Completions',
  dimensions: function ({
    timeUnit
  }) {
    return `ga:${timeUnit || 'date'}`
  },
}
