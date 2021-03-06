const filter = ({ responseData: collection, sourceCountry }) => {
  const isSourceCountryEmpty = !sourceCountry || sourceCountry.length === 0
  return collection.filter(item => {
    return isSourceCountryEmpty || sourceCountry.includes(item[0])
  })
}

const getDistribution = ({ responseData: collection }) => {
  // 全部的总数
  let totalCount = 0,
    sourceCountryFilterCollection = []

  collection.forEach(item => {
    totalCount += parseInt(item[1], 10)
    sourceCountryFilterCollection.push({
      text: item[0],
      value: item[0],
    })
  })

  return {
    distribution: collection.slice(0, 10).map(item => ({
      item: item[0],
      count: parseInt(item[1], 10),
      percent: parseInt(item[1], 10) / totalCount,
    })),
    sourceCountryFilterCollection,
  }
}

const getDistributionGrowth = ({
  distribution,
  distributionDoubleTimespan,
}) => {
  const { responseData: top10collection } = distribution
  const {
    responseData: top10DoubleTimespanCollection,
  } = distributionDoubleTimespan

  const top10DoubleTimespanObj = top10DoubleTimespanCollection.reduce(
    (acc, val) => {
      acc[val[0]] = parseInt(val[1] || 0, 10)
      return acc
    },
    {}
  )

  return {
    distributionGrowth: top10collection.slice(0, 10).map(item => {
      const currentCount = parseInt(item[1] || 0, 10)
      const currentPlusLastCount = top10DoubleTimespanObj[item[0]]
      const value = currentCount * 2 - currentPlusLastCount
      return {
        item: item[0],
        value,
      }
    }),
  }
}

const convert = ({ responseDataArray }) => {
  const [responseData1, responseData2] = responseDataArray,
    singleResponse = responseData1.isDoubleTimespan
      ? responseData2
      : responseData1,
    doubleResponse = responseData1.isDoubleTimespan
      ? responseData1
      : responseData2,
    {
      responseData,
      selectorData: { sourceCountry },
    } = singleResponse,
    filteredResponseData = {
      ...singleResponse,
      responseData: filter({
        responseData,
        sourceCountry,
      }),
    }

  return {
    ...getDistribution(filteredResponseData),
    ...getDistributionGrowth({
      distribution: filteredResponseData,
      distributionDoubleTimespan: doubleResponse,
    }),
  }
}

export default {
  customConverters: [convert],
}
