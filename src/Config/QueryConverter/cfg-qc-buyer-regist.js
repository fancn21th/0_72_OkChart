export default {
  metrics: 'ga:goal12Completions',
  dimensions: function({ selectorData: { timeUnit } }) {
    return `ga:${timeUnit || 'date'}`
  },
}
