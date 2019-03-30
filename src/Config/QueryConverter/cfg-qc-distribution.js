export default {
  metrics: function({ selectorData: { pvuv } }) {
    return pvuv
  },
  dimensions: function({ selectorData: { countryBrowser } }) {
    return countryBrowser
  },
  sort: function({ metrics, selectorData: { workingDate } }) {
    if (workingDate) return metrics
    return `-${metrics}`
  },
}
