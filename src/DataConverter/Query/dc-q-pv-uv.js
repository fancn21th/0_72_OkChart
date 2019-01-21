const convert = ({ ids, timespan, timeUnit, startDate, endDate }) => {
  // TODO: debugger console
  console.log(
    `ids:${ids}, timespan:${timespan}, timeUnit:${timeUnit}, startDate:${startDate}, endDate:${endDate},`
  )
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const dimensionsStr = `ga:${timeUnit || 'date'}`
  return {
    ids,
    metrics: 'ga:pageviews,ga:uniquePageviews',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
  }
}

export default convert
