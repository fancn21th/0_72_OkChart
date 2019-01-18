const convert = (ids, data) => {
  return {
    ids,
    metrics: 'ga:pageviews,ga:uniquePageviews',
    dimensions: 'ga:date',
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
  }
}

export default convert
