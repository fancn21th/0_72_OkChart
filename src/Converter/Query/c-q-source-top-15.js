// import { doubleTimespanStartDate } from '../../Utils/TimeHelper'

// const convert = ({ ids, timespan, startDate, endDate, pvuv, isDouble }) => {
//   let startDateStr, endDateStr, metricsStr, dimensionsStr

//   if (isDouble) {
//     timespan = parseInt(timespan || '30', 10) * 2
//     startDate =
//       startDate && endDate
//         ? doubleTimespanStartDate(startDate, endDate)
//         : startDate
//     startDateStr = startDate || `${timespan || '30'}daysAgo`
//     endDateStr = endDate || 'yesterday'
//   } else {
//     startDateStr = startDate || `${timespan || '30'}daysAgo`
//     endDateStr = endDate || 'yesterday'
//   }

//   // metrics and dimension
//   metricsStr = pvuv || 'ga:pageviews'
//   dimensionsStr = 'ga:source'

//   const param = {
//     ids,
//     metrics: metricsStr,
//     dimensions: dimensionsStr,
//     'start-date': startDateStr,
//     'end-date': endDateStr,
//     sort:
//       metricsStr === 'ga:pageviews,ga:users'
//         ? '-ga:pageviews'
//         : `-${metricsStr}`,
//   }
//   return param
// }

// export default convert
