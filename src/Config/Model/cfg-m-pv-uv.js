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
  const dateFieldIndex = 0,
    pvFieldIndex = 3,
    uvFieldIndex = 4,
    result = []

  // group by date
  const map = responseData.reduce((map, item) => {
    const key = item[dateFieldIndex]
    if (map.has(key)) {
      const oldValue = map.get(key)
      map.set(key, {
        pv: oldValue.pv + parseInt(item[pvFieldIndex], 10),
        uv: oldValue.uv + parseInt(item[uvFieldIndex], 10),
      })
    } else {
      map.set(key, {
        pv: parseInt(item[pvFieldIndex], 10),
        uv: parseInt(item[uvFieldIndex], 10),
      })
    }
    return map
  }, new Map())

  map.forEach((values, key) => {
    result.push({
      day: key,
      ...values,
    })
  })

  console.log(result)
}

export default {
  customConverters: [filter, convert],
}
