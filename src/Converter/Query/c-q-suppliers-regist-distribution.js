const convert = ({ ids, timespan, startDate, endDate, countryBrowser }) => {
    const startDateStr = startDate || `${timespan || '30'}daysAgo`
    const enDateStr = endDate || 'yesterday'
    const dimensionsStr = countryBrowser || `ga:source`
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