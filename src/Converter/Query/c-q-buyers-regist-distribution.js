const convert = ({ ids, timespan, timeUnit, startDate, endDate }) => {
    const startDateStr = startDate || `${timespan || '30'}daysAgo`
    const enDateStr = endDate || 'yesterday'
        // const dimensionsStr = `ga:${timeUnit || 'date'}`
    const dimensionsStr = `ga:country`
        // ga:country,ga:browser
    const param = {
            ids,
            metrics: 'ga:goal1Completions',
            dimensions: dimensionsStr,
            'start-date': startDateStr,
            'end-date': enDateStr,
            sort: 'ga:goal1Completions'
        }
        // TODO: console
    return param
}

export default convert
