export default {
  metrics: 'ga:pageviews,ga:users',
  dimensions: function({ selectorData: { timeUnit } }) {
    return `ga:${timeUnit || 'date'},ga:channelGrouping,ga:country`
  },
}
