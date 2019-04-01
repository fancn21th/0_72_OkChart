const filter = ({ responseDataSolo }) => {
  const { responseData, selectorData } = responseDataSolo,
    { source, country } = selectorData,
    isSourceEmpty = !source || source.length === 0,
    isCountryEmpty = !country || country.length === 0,
    channelIdx = 1,
    countryIdx = 2

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

const isFreeSource = source => !source.toLowerCase().includes('paid')

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { timespan, startDate, endDate, workingDate, timeUnit },
    context: { nonWorkingDateCount },
  },
}) => {
  const dateFieldIndex = 0,
    sourceFieldIndex = 1,
    countryFieldIndex = 2,
    pvFieldIndex = 3,
    uvFieldIndex = 4,
    pvuv = [],
    sourceMap = new Map(),
    countryMap = new Map(),
    sourceFilterCollection = [],
    countryFilterCollection = []

  // group by time unit
  const map = responseData.reduce((map, item) => {
    const key = item[dateFieldIndex],
      source = item[sourceFieldIndex],
      country = item[countryFieldIndex],
      currentPv = parseInt(item[pvFieldIndex], 10),
      currentUv = parseInt(item[uvFieldIndex], 10),
      isFree = isFreeSource(source),
      currentFreePv = isFree ? currentPv : 0,
      currentFreeUv = isFree ? currentUv : 0

    if (map.has(key)) {
      const oldValue = map.get(key)
      map.set(key, {
        PV: oldValue.PV + currentPv,
        UV: oldValue.UV + currentUv,
        FPV: oldValue.FPV + currentFreePv,
        FUV: oldValue.FUV + currentFreeUv,
      })
    } else {
      map.set(key, {
        PV: currentPv,
        UV: currentUv,
        FPV: currentFreePv,
        FUV: currentFreeUv,
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
    Object.keys(value).forEach(item => {
      pvuv.push({
        date: key,
        type: item,
        value: value[item],
      })
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
    pvuv,
    sourceFilterCollection,
    countryFilterCollection,
  }
}

export default {
  customConverters: [filter, convert],
}
