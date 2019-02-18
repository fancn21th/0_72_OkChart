import { timespanDiff } from '../../Utils/TimeHelper'
const convert = ({ collection, timespan, startDate, endDate }) => {
  const top15 = collection.reverse().slice(0, 15)
  const days = timespanDiff(timespan || 30, startDate, endDate)
  return top15.map(item => ({
    item: item[0],
    count: Math.round(parseInt(item[1] / days, 10)),
  }))
}

export default convert
