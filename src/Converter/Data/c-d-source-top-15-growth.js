import { timespanDiff } from '../../Utils/TimeHelper'

const convert = ({ top15, top15DoubleTimespan }) => {
  // TODO: CAUTION
  // There is a unknown behavior conducted by ga that sort is not working in consistent manner
  // aka top15DoubleTimespan in wrong order
  // However top15DoubleTimespan is not sort-concern
  const { collection: top15Collection, timespan, startDate, endDate } = top15
  const { collection: top15DoubleTimespanCollection } = top15DoubleTimespan
  // TODO: Performance Issue
  const top15DoubleTimespanObj = top15DoubleTimespanCollection.reduce(
    (acc, val) => {
      const sum = val[1] || 0
      acc[val[0]] = parseInt(sum, 10)
      return acc
    },
    {}
  )
  const days = timespanDiff(timespan || 30, startDate, endDate)
  return top15Collection.slice(0, 15).map(item => {
    const value = Math.round(
      (parseInt(item[1], 10) * 2 - top15DoubleTimespanObj[item[0]]) / days
    )
    return {
      item: item[0],
      value,
    }
  })
}

export default convert
