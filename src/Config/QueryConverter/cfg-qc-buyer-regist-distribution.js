export default {
  metrics: 'ga:goal12Completions',
  dimensions: function({ selectorData: { countryBrowser } }) {
    return countryBrowser
  },
  sort: '-ga:goal12Completions',
}
