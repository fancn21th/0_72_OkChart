export default {
  metrics: 'ga:goal12Completions',
  dimensions: function({ selectorData: { countryBrowser } }) {
    return countryBrowser
  },
  sort: function({ selectorData: { workingDate } }) {
    if (workingDate) return 'ga:goal12Completions'
    return '-ga:goal12Completions'
  },
}
