const convert = ({
  ids,
  timespan,
  startDate,
  endDate,
  countryBrowser,
  isDouble,
}) => {
  // TODO: double start date is not ready
  const doubleStartDate = isDouble ? startDate : startDate
  const doubleTimespan = isDouble
    ? parseInt(timespan || '30', 10) * 2
    : timespan

  const startDateStr = doubleStartDate || `${doubleTimespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const dimensionsStr = countryBrowser || `ga:source`
  const param = {
    ids,
    metrics: 'ga:goal12Completions',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
    sort: 'ga:goal12Completions',
  }
  return param
}

export default convert
