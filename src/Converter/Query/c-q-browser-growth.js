const convert = ({
  ids,
  timespan,
  startDate,
  endDate,
  pvuv,
  countryBrowser,
}) => {
  const startDateStr = `${timespan * 2 || '60'}daysAgo`
  const enDateStr = `${timespan || '30'}daysAgo`
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
  // TODO: console
  return param
}

export default convert
