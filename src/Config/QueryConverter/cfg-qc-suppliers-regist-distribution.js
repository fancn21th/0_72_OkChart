export default {
  metrics: 'ga:goal7Completions',
  dimensions: function({ selectorData: { countryBrowser } }) {
    return countryBrowser
  },
  sort: function({ selectorData: { workingDate } }) {
    if (workingDate) return 'ga:goal7Completions'
    return '-ga:goal7Completions'
  },
}
