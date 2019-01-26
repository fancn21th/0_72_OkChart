const convert = ({ ids, timespan, timeUnit, startDate, endDate }) => {
    const startDateStr = startDate || `${timespan || '30'}daysAgo`
    const enDateStr = endDate || 'yesterday'
    const dimensionsStr = `ga:${timeUnit || 'date'}`
    const param = {
            ids,
            // metrics: 'ga:pageviews,ga:uniquePageviews',
            metrics: 'ga:goal1Completions',
            dimensions: dimensionsStr,
            'start-date': startDateStr,
            'end-date': enDateStr,
        }
        // TODO: console
    return param
}

export default convert