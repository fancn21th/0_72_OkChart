export default {
  metrics: 'ga:goal7Completions',
  dimensions: function({ selectorData: { countryBrowser } }) {
    return countryBrowser
  },
  sort: '-ga:goal7Completions',
}
