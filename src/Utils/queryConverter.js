const defaultConvertFunctions = {
  ids: ({ ids }) => ({ ids }),
  metrics: ({ metrics }) => ({ metrics }),
  sort: () => null,
  dimensions: ({ workingDate, dimensions }) => {
    if (workingDate) {
      return `ga:date,${dimensions}`
    }
    return dimensions
  },
  date: ({ timespan, startDate, endDate }) => {
    const startDateStr = startDate || `${timespan || '30'}daysAgo`
    const enDateStr = endDate || 'yesterday'
    return {
      'start-date': startDateStr,
      'end-date': enDateStr,
    }
  },
}

const convert = ({ config, selectorData }) => {
  if (!config) {
    return {
      ...selectorData,
    }
  }
  const mergedSelectorData = {
    ...config,
    ...selectorData,
  }
  const queryParams = Object.keys(config).reduce((acc, key) => {
    const configVal = config[key]

    if (configVal === 'default' || configVal === undefined) {
      const params = defaultConvertFunctions[key](mergedSelectorData)
      if (params) {
        return {
          ...acc,
          ...params,
        }
      }
    } else if (typeof configVal === 'string') {
      return {
        ...acc,
        [key]: config[key],
      }
    }
    return acc
  }, {})
  // TODO: still need to return selectorData
  return {
    ...selectorData,
    queryParams,
  }
}

export default convert
