const convert = ({ ids, timespan, startDate, endDate, pvuv, isDouble }) => {
  // TODO: double start date is not ready
  const doubleStartDate = isDouble ? startDate : startDate
  const doubleTimespan = isDouble
    ? parseInt(timespan || '30', 10) * 2
    : timespan
    
  const startDateStr = doubleStartDate || `${doubleTimespan || '30'}daysAgo`
  const endDateStr = endDate || 'yesterday'
  const metricsStr = pvuv || 'ga:pageviews'
  const dimensionsStr = 'ga:source'
  const param = {
    ids,
    metrics: metricsStr,
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': endDateStr,
    sort:
      metricsStr === 'ga:pageviews,ga:users'
        ? '-ga:pageviews'
        : `-${metricsStr}`,
  }
  return param
}

export default convert
