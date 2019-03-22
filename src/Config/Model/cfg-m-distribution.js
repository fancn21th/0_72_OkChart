import {
  timespanDiff
} from '../../Utils/TimeHelper'

const filter = ({
  responseData: collection,
  sourceCountry
}) => {
  const isSourceCountryEmpty = !sourceCountry || sourceCountry.length === 0
  return collection.filter(item => {
    return isSourceCountryEmpty || sourceCountry.includes(item[0])
  })
}

const getDistribution = ({
  responseData: collection,
  selectorData: {
    timespan,
    startDate,
    endDate,
  },
}) => {
  let totalCount = 0,
    sourceCountryFilterCollection = []

  collection.map(item => {
    totalCount += parseInt(item[1], 10)
    sourceCountryFilterCollection.push({
      text: item[0],
      value: item[0],
    })
  })
  const top10 = collection.slice(0, 10)
  const days = timespanDiff(timespan || 30, startDate, endDate)
  let top10Data = top10.map(item => {
    const count = Math.round(parseInt(item[1], 10) / days)
    const percent =
      parseInt((parseInt(item[1], 10) * 10000) / totalCount) / 10000
    return {
      item: item[0],
      count,
      percent,
    }
  })
  return {
    distribution: top10Data,
    sourceCountryFilterCollection
  }
}

const getDistributionGrowth = ({
  top15,
  top15DoubleTimespan
}) => {
  const {
    responseData: top15Collection,
    selectorData: {
      timespan,
      startDate,
      endDate,
      pvuv
    },
  } = top15
  const {
    responseData: top15DoubleTimespanCollection
  } = top15DoubleTimespan
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
    }, {}
  )
  const days = timespanDiff(timespan || 30, startDate, endDate)
  // growth data is mainly based on top 15 of data of pageviews
  // TOOD: logic is too complex, consider to refactor
  return {
    distributionGrowth: top15Collection.slice(0, 10).map(item => {
      const currentPvOrUv = parseInt(item[1] || 0, 10)
      const currentUv = isUvDividedByPV ? parseInt(item[2] || 0, 10) : undefined
      const currentPlusLastPvOrUv = top15DoubleTimespanObj[item[0]].pv_or_uv
      const currentPlusLastUv = top15DoubleTimespanObj[item[0]].uv

      const value = isUvDividedByPV ? // pv / uv
        Math.round(currentPvOrUv / currentUv) -
        // pv / uv in last time span
        Math.round(
          (currentPlusLastPvOrUv - currentPvOrUv) /
          (currentPlusLastUv - currentUv)
        ) :
        Math.round((currentPvOrUv * 2 - currentPlusLastPvOrUv) / days)
      return {
        item: item[0],
        value,
      }
    })
  }
}

const convert = ({
  responseDataArray
}) => {
  const [responseData1, responseData2] = responseDataArray,
  singleResponse = responseData1.isDoubleTimespan ?
    responseData2 :
    responseData1,
    doubleResponse = responseData1.isDoubleTimespan ?
    responseData1 :
    responseData2, {
      isResponseDataFromCache,
      responseData,
      selectorData: {
        sourceCountry
      },
    } = singleResponse, filteredResponseData = {
      ...singleResponse,
      responseData: filter({
        responseData,
        sourceCountry,
      }),
    }

  return {
    ...getDistribution(filteredResponseData),
    ...getDistributionGrowth({
      top15: filteredResponseData,
      top15DoubleTimespan: doubleResponse,
    }),
    isResponseDataFromCache
  }
}

export default {
  customConverters: [convert],
  groupFieldIndex: 0,
  sumFieldIndex: [1, 2],
  sortField: [{
    index: 1,
    order: 'desc',
  }, ],
}
