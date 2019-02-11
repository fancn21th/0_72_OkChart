const convert = ({ ids, timespan, startDate, endDate, pvuv }) => {
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const metricsStr = pvuv || 'ga:pageviews'
  const dimensionsStr = 'ga:source'
  const param = {
    ids,
    metrics: metricsStr,
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
    sort: metricsStr,
  }
  return param
}

export default convert
