export default {
  metrics: 'ga:goal7Completions',
  dimensions: function({ selectorData: { timeUnit } }) {
    return `ga:${timeUnit || 'date'}`
  },
}
