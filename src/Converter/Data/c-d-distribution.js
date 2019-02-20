import { timespanDiff } from '../../Utils/TimeHelper'

const convert = ({ collection, timespan, startDate, endDate, pvuv }) => {
  // TODO: must not use mutate array method
  let totalCount = 0
  collection.map(item => {
    totalCount += parseInt(item[1], 10)
  })
  const top10 = collection.slice(0, 10)
  const days = timespanDiff(timespan || 30, startDate, endDate)
  let top10Data = top10.map(item => {
    const count = Math.round(parseInt(item[1], 10) / days)
    const percent = parseInt(parseInt(item[1], 10)*10000/totalCount)/10000
    return {
      item: item[0],
      count,
      percent,
    }
  })
  console.log(top10Data)
  return top10Data
}

export default convert
