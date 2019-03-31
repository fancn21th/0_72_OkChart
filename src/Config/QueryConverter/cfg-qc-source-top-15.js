export default {
  metrics: function({ selectorData: { pvuv } }) {
    return pvuv
  },
  dimensions: 'ga:source',
  sort: function({ metrics }) {
    return `-${metrics}`
  },
}
