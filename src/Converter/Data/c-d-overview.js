import { timespanDiff } from '../../Utils/TimeHelper'

const convert = ({
  collection,
  timespan,
  startDate,
  endDate,
  workingDate,
  nonWorkingDateCount,
}) => {
  let pv = 0,
    uv = 0,
    buyerCount = 0,
    supplierCount = 0

  const source = [],
    country = [],
    sourceObj = {},
    countryObj = {},
    idxOffset = workingDate === true ? 1 : 0,
    channelIdx = 0 + idxOffset,
    countryIdx = 1 + idxOffset,
    pvIdx = 2 + idxOffset,
    uvIdx = 3 + idxOffset,
    buyerCountIdx = 4 + idxOffset,
    supplierCountIdx = 5 + idxOffset

  let days = timespanDiff(timespan || 30, startDate, endDate)

  days = workingDate === true ? days - nonWorkingDateCount : days

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
