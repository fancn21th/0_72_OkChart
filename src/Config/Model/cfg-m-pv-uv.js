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
    selectorData: { timespan, startDate, endDate, workingDate, timeUnit },
    nonWorkingDateCount,
  },
}) => {
  const dateFieldIndex = timeUnit === 'date' ? 0 : 1,
    pvFieldIndex = timeUnit === 'date' ? 3 : 4,
    uvFieldIndex = timeUnit === 'date' ? 4 : 5,
    sourceFieldIndex = timeUnit === 'date' ? 1 : 2,
    countryFieldIndex = timeUnit === 'date' ? 2 : 3,
    result = [],
    sourceMap = new Map(),
    countryMap = new Map(),
    sourceFilterCollection = [],
    countryFilterCollection = []

  // group by time unit
  const map = responseData.reduce((map, item) => {
    const key = item[dateFieldIndex],
      source = item[sourceFieldIndex],
      country = item[countryFieldIndex]
    if (map.has(key)) {
      const oldValue = map.get(key)
      map.set(key, {
        PV: oldValue.PV + parseInt(item[pvFieldIndex], 10),
        UV: oldValue.UV + parseInt(item[uvFieldIndex], 10),
      })
    } else {
      map.set(key, {
        PV: parseInt(item[pvFieldIndex], 10),
        UV: parseInt(item[uvFieldIndex], 10),
      })
    }
    if (!sourceMap.has(source)) {
      sourceMap.set(source, true)
    }
    if (!countryMap.has(country)) {
      countryMap.set(country, true)
    }
    return map
  }, new Map())

  map.forEach((value, key) => {
    result.push({
      timeUnit: key,
      ...value,
    })
  })

  sourceMap.forEach((value, key) => {
    sourceFilterCollection.push({
      text: key,
      value: key,
    })
  })

  countryMap.forEach((value, key) => {
    countryFilterCollection.push({
      text: key,
      value: key,
    })
  })

  return {
    pvuv: result,
    sourceFilterCollection,
    countryFilterCollection,
  }
}

export default {
  customConverters: [filter, convert],
}
