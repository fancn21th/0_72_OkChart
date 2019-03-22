import { timespanDiff } from '../../Utils/TimeHelper'

const filter = ({ responseDataSolo }) => {
  const { responseData, selectorData } = responseDataSolo,
    { source, country, workingDate } = selectorData,
    isSourceEmpty = !source || source.length === 0,
    isCountryEmpty = !country || country.length === 0,
    idxOffset = workingDate === true ? 1 : 0,
    channelIdx = 0 + idxOffset,
    countryIdx = 1 + idxOffset

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
    nonWorkingDateCount,
  },
}) => {
  let pv = 0,
    uv = 0,
    buyerCount = 0,
    supplierCount = 0

  const sourceFilterCollection = [],
    countryFilterCollection = [],
    sourceObj = {},
    countryObj = {},
    idxOffset = workingDate === true ? 1 : 0,
    channelIdx = 0 + idxOffset,
    countryIdx = 1 + idxOffset,
    pvIdx = 2 + idxOffset,
    uvIdx = 3 + idxOffset,
    buyerCountIdx = 4 + idxOffset,
    supplierCountIdx = 5 + idxOffset

  responseData.forEach(item => {
    pv += parseInt(item[pvIdx], 10)
    uv += parseInt(item[uvIdx], 10)
    buyerCount += parseInt(item[buyerCountIdx])
    supplierCount += parseInt(item[supplierCountIdx])
    if (!(item[channelIdx] in sourceObj)) {
      sourceObj[item[channelIdx]] = true
    }
    if (!(item[countryIdx] in countryObj)) {
      countryObj[item[countryIdx]] = true
    }
  })

  let days = timespanDiff(timespan || 30, startDate, endDate)
  days = workingDate === true ? days - nonWorkingDateCount : days

  pv = Math.round(pv / days)
  uv = Math.round(uv / days)

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
    pv,
    uv,
    buyerCount,
    supplierCount,
    sourceFilterCollection,
    countryFilterCollection,
  }
}

export default {
  customConverters: [filter, convert],
}
