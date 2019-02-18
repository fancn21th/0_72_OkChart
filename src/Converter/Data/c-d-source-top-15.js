import { timespanDiff } from '../../Utils/TimeHelper'
const convert = ({ collection, timespan, startDate, endDate, pvuv }) => {
  const top15 = collection.reverse().slice(0, 15)
  const isUvDividedByPV = pvuv === 'ga:pageviews,ga:users'
  const days = timespanDiff(timespan || 30, startDate, endDate)
  return top15.map(item => {
    const count = isUvDividedByPV
      ? Math.round(parseInt(item[1], 10) / parseInt(item[2], 10))
      : Math.round(parseInt(item[1], 10) / days)
    return {
      item: item[0],
      count,
    }
  })
}

export default convert
