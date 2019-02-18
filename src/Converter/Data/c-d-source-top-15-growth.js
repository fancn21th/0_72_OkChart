import { timespanDiff } from '../../Utils/TimeHelper'

const convert = ({ top15, top15DoubleTimespan }) => {
  // TODO: CAUTION
  // There is a unknown behavior conducted by ga that sort is not working in consistent manner
  // aka top15DoubleTimespan in wrong order
  // However top15DoubleTimespan is not sort-concern
  const {
    collection: top15Collection,
    timespan,
    startDate,
    endDate,
    pvuv,
  } = top15
  const { collection: top15DoubleTimespanCollection } = top15DoubleTimespan
  const isUvDividedByPV = pvuv === 'ga:pageviews,ga:users'
  // TODO: Potential Performance Issue
  const top15DoubleTimespanObj = top15DoubleTimespanCollection.reduce(
    (acc, val) => {
      const pv_or_uv = parseInt(val[1] || 0, 10)
      const uv = isUvDividedByPV ? parseInt(val[2] || 0, 10) : undefined
      acc[val[0]] = {
        pv_or_uv,
        uv,
      }
      return acc
    },
    {}
  )
  const days = timespanDiff(timespan || 30, startDate, endDate)
  // growth data is mainly based on top 15 of data of pageviews
  return top15Collection.slice(0, 15).map(item => {
    const currentPvOrUv = parseInt(item[1] || 0, 10)
    const currentUv = isUvDividedByPV ? parseInt(item[2] || 0, 10) : undefined
    const currentPlusLastPvOrUv = top15DoubleTimespanObj[item[0]].pv_or_uv
    const currentPlusLastUv = top15DoubleTimespanObj[item[0]].uv

    const value = isUvDividedByPV
      ? // pv / uv
        Math.round(currentPvOrUv / currentUv) -
        // pv / uv in last time span
        Math.round(
          (currentPlusLastPvOrUv - currentPvOrUv) /
            (currentPlusLastUv - currentUv)
        )
      : Math.round((currentPvOrUv * 2 - currentPlusLastPvOrUv) / days)
    return {
      item: item[0],
      value,
    }
  })
}

export default convert
