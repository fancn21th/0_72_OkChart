const convert = ({
  ids,
  timespan,
  timeUnit,
  startDate,
  endDate,
  countryBrowser,
}) => {
  const startDateStr = startDate || `${timespan * 2 || '60'}daysAgo`
  const enDateStr = `${timespan || '30'}daysAgo`
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
