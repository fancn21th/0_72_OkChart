export default {
  metrics: 'ga:goal12Completions',
  dimensions: function({ countryBrowser }) {
    return countryBrowser
  },
  sort: function({ workingDate }) {
    if (workingDate) return 'ga:goal12Completions'
    return '-ga:goal12Completions'
  },
}
