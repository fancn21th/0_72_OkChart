import { timespanDiff } from '../../Utils/TimeHelper'
const convert = ({ collection, timespan, startDate, endDate }) => {
  let pv = 0,
    uv = 0,
    buyerCount = 0,
    supplierCount = 0,
    source = [],
    country = [],
    sourceObj = {},
    countryObj = {}

  const days = timespanDiff(timespan || 30, startDate, endDate)

  collection.forEach(item => {
    pv += parseInt(item[2], 10)
    uv += parseInt(item[3], 10)
    buyerCount += parseInt(item[4])
    supplierCount += parseInt(item[5])
    if (!sourceObj[item[0]]) {
      sourceObj[item[0]] = true
    }
    if (!countryObj[item[1]]) {
      countryObj[item[1]] = true
    }
  })

  // pv = Math.round(pv / days)
  // uv = Math.round(uv / days)

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
