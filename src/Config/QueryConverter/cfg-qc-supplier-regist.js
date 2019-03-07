export default {
  metrics: 'ga:goal7Completions',
  dimensions: function ({
    timeUnit
  }) {
    return `ga:${timeUnit || 'date'}`
  },
}
