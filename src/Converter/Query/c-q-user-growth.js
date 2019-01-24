const convert = ({
  ids,
  timespan,
  startDate,
  endDate,
  pvuv,
  countryBrowser,
}) => {
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const metricsStr = pvuv || 'ga:pageviews'
  const dimensionsStr = countryBrowser || 'ga:browser'
  const param = {
    ids,
    metrics: metricsStr,
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
    sort: metricsStr,
  }
  // TODO: console
  return param
}

export default convert
