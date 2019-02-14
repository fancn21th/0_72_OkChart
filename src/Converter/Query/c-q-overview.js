const convert = ({ ids, timespan, startDate, endDate }) => {
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  const dimensionsStr = 'ga:source,ga:country'
  const param = {
    ids,
    // uv, pv, user count, supplier count
    metrics: 'ga:pageviews,ga:users,ga:goal12Completions,ga:goal7Completions',
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': enDateStr,
  }
  return param
}

export default convert
