export default {
  metrics: function({ pvuv }) {
    return {
      metrics: pvuv,
    }
  },
  dimensions: 'ga:source',
}
