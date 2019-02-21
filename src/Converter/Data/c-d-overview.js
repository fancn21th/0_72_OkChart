import { timespanDiff } from '../../Utils/TimeHelper'

const convert = ({ collection, timespan, startDate, endDate, workingDate }) => {
  let pv = 0,
    uv = 0,
    buyerCount = 0,
    supplierCount = 0,
    source = [],
    country = [],
    sourceObj = {},
    countryObj = {},
    channelIdx = workingDate === false ? 1 : 0,
    countryIdx = workingDate === false ? 2 : 1,
    pvIdx = workingDate === false ? 3 : 2,
    uvIdx = workingDate === false ? 4 : 3,
    buyerCountIdx = workingDate === false ? 5 : 4,
    supplierCountIdx = workingDate === false ? 6 : 5

  const days = timespanDiff(timespan || 30, startDate, endDate)

  collection.forEach(item => {
    pv += parseInt(item[pvIdx], 10)
    uv += parseInt(item[uvIdx], 10)
    buyerCount += parseInt(item[buyerCountIdx])
    supplierCount += parseInt(item[supplierCountIdx])
    if (!sourceObj[item[channelIdx]]) {
      sourceObj[item[channelIdx]] = true
    }
    if (!countryObj[item[countryIdx]]) {
      countryObj[item[countryIdx]] = true
    }
  })

  pv = Math.round(pv / days)
  uv = Math.round(uv / days)

  // convert source
  Object.keys(sourceObj).forEach(item => {
    source.push({
      text: item,
      value: item,
    })
  })

  // convert country
  Object.keys(countryObj).forEach(item => {
    country.push({
      text: item,
      value: item,
    })
  })

  return { pv, uv, buyerCount, supplierCount, source, country }
}

export default convert
