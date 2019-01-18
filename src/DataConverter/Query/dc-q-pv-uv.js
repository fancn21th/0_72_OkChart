const convert = ({ ids, timespan, timeUnit = 'date', startDate, endDate }) => {
  const startDateStr = `${timespan}daysAgo`
  const dimensionsStr = `ga:${timeUnit}`
  return {
    ids,
    metrics: 'ga:pageviews,ga:uniquePageviews',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': 'yesterday',
  }
}

export default convert
