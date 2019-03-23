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

const isFreeSource = source => !source.toLowerCase().includes('paid')

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { timespan, startDate, endDate, workingDate, timeUnit },
    nonWorkingDateCount,
  },
}) => {
  const fieldOffset = timeUnit === 'date' || !workingDate,
    dateFieldIndex = fieldOffset ? 0 : 1,
    pvFieldIndex = fieldOffset ? 3 : 4,
    uvFieldIndex = fieldOffset ? 4 : 5,
    sourceFieldIndex = fieldOffset ? 1 : 2,
    countryFieldIndex = fieldOffset ? 2 : 3,
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
    pvuv.push({
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
    pvuv,
    sourceFilterCollection,
    countryFilterCollection,
  }
}

export default {
  customConverters: [filter, convert],
}
