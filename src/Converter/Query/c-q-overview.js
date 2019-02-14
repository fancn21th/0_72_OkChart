const convert = ({ ids, timespan, timeUnit, startDate, endDate }) => {
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const dimensionsStr = `ga:${timeUnit || 'date'}`
  const param = {
    ids,
    metrics: 'ga:pageviews,ga:users',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
  }
  return param
}

export default convert
