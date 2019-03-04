import { timespanDiff } from '../../Utils/TimeHelper'

const getTop15 = ({
  responseData: collection,
  selectorData: { timespan, startDate, endDate, pvuv },
}) => {
  // TODO: must not use mutate array method
  const top15 = collection.slice(0, 15)
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

const getTop15Growth = ({ top15, top15DoubleTimespan }) => {
  const {
    responseData: top15Collection,
    selectorData: { timespan, startDate, endDate, pvuv },
  } = top15
  const { responseData: top15DoubleTimespanCollection } = top15DoubleTimespan
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
  // TOOD: logic is too complex, consider to refactor
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

const convert = ({ responseData }) => {
  const [response1, response2] = responseData,
    singleResponse = response1.isDoubleTimespan ? response2 : response1,
    doubleResponse = response1.isDoubleTimespan ? response1 : response2

  return {
    top15: getTop15(singleResponse),
    top15Growth: getTop15Growth({
      top15: singleResponse,
      top15DoubleTimespan: doubleResponse,
    }),
  }
}

export default {
  customConverters: [convert],
  groupFieldIndex: 0,
  sumFieldIndex: 1,
  sumFieldSort: 'desc',
}
