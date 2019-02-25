import { doubleTimespanStartDate } from '../../Utils/TimeHelper'

const convert = ({
  ids,
  timespan,
  startDate,
  endDate,
  countryBrowser,
  isDouble,
}) => {
  let startDateStr, endDateStr, metricsStr, dimensionsStr, sortStr

  if (isDouble) {
    timespan = parseInt(timespan || '30', 10) * 2
    startDate =
      startDate && endDate
        ? doubleTimespanStartDate(startDate, endDate)
        : startDate
    startDateStr = startDate || `${timespan || '30'}daysAgo`
    endDateStr = endDate || 'yesterday'
  } else {
    startDateStr = startDate || `${timespan || '30'}daysAgo`
    endDateStr = endDate || 'yesterday'
  }

  // metrics and dimension
  metricsStr = 'ga:goal7Completions'
  dimensionsStr = countryBrowser || `ga:source`
  sortStr = '-ga:goal7Completions'

  const param = {
    ids,
    metrics: metricsStr,
    dimensions: dimensionsStr,
    'start-date': startDateStr,
    'end-date': endDateStr,
    sort: sortStr,
  }
  return param
}

export default convert
