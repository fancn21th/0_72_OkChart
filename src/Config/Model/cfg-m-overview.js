import { timespanDiff } from '../../Utils/TimeHelper'

const filter = ({ responseDataSolo }) => {
  const { responseData, selectorData } = responseDataSolo,
    { source, country } = selectorData,
    isSourceEmpty = !source || source.length === 0,
    isCountryEmpty = !country || country.length === 0,
    channelIdx = 0,
    countryIdx = 1

  return {
    responseDataSolo: {
      ...responseDataSolo,
      responseData: responseData.filter(
        item =>
          (isSourceEmpty || source.includes(item[channelIdx])) &&
          (isCountryEmpty || country.includes(item[countryIdx]))
      ),
    },
  }
}

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { timespan, startDate, endDate, workingDate },
    context: { nonWorkingDateCount },
  },
}) => {
  const sourceFilterCollection = [],
    countryFilterCollection = [],
    sourceObj = {},
    countryObj = {},
    channelIdx = 0,
    countryIdx = 1,
    pvIdx = 2,
    uvIdx = 3,
    buyerCountIdx = 4,
    supplierCountIdx = 5

  let map = responseData.reduce((acc, item) => {
    const key = item[channelIdx],
      pv = parseInt(item[pvIdx], 10),
      uv = parseInt(item[uvIdx], 10),
      buyerCount = parseInt(item[buyerCountIdx], 10),
      supplierCount = parseInt(item[supplierCountIdx], 10),
      sourceName = item[channelIdx],
      countryName = item[countryIdx]

    if (!(sourceName in sourceObj)) {
      sourceObj[sourceName] = true
    }

    if (!(countryName in countryObj)) {
      countryObj[countryName] = true
    }

    if (acc.has(key)) {
      const oldValue = acc.get(key)
      acc.set(key, {
        pv: oldValue.pv + pv,
        uv: oldValue.uv + uv,
        buyerCount: oldValue.buyerCount + buyerCount,
        supplierCount: oldValue.supplierCount + supplierCount,
      })
    } else {
      acc.set(key, {
        pv,
        uv,
        buyerCount,
        supplierCount,
      })
    }
    return acc
  }, new Map())

  let data = []

  let days = timespanDiff(timespan || 30, startDate, endDate)
  days = workingDate === true ? days - nonWorkingDateCount : days

  map.forEach(({ pv, uv, buyerCount, supplierCount }, key) => {
    data.push([
      key,
      Math.round(pv / days),
      Math.round(uv / days),
      buyerCount,
      supplierCount,
    ])
  })

  data.sort((a, b) => b[1] - a[1])

  // convert source
  Object.keys(sourceObj).forEach(item => {
    sourceFilterCollection.push({
      text: item,
      value: item,
    })
  })

  // convert country
  Object.keys(countryObj).forEach(item => {
    countryFilterCollection.push({
      text: item,
      value: item,
    })
  })

  return {
    data,
    sourceFilterCollection,
    countryFilterCollection,
  }
}

export default {
  customConverters: [filter, convert],
}
