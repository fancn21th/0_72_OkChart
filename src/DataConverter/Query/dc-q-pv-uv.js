const convert = ({ ids, timespan, timeUnit, startDate, endDate }) => {
  const startDateStr = `${timespan || '30'}daysAgo`
  const dimensionsStr = `ga:${timeUnit || 'date'}`
  return {
    ids,
    metrics: 'ga:pageviews,ga:uniquePageviews',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': 'yesterday',
  }
}

export default convert
