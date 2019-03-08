export default {
  metrics: 'ga:goal7Completions',
  dimensions: function({ countryBrowser }) {
    return countryBrowser
  },
  sort: function({ workingDate }) {
    if (workingDate) return 'ga:goal7Completions'
    return '-ga:goal7Completions'
  },
}
