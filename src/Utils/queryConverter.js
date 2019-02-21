const defaultConvertFunctions = {
  ids: ({ ids }) => ({ ids }),
  metrics: ({ metrics }) => ({ metrics }),
  sort: () => null,
  dimensions: ({ workingDate, dimensions }) => {
    if (workingDate) {
      return {
        dimensions: `ga:date,${dimensions}`,
      }
    }
    return {
      dimensions,
    }
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
  const queryParams = Object.keys(defaultConvertFunctions).reduce(
    (acc, key) => {
      const configVal = config[key]
      if (
        configVal === undefined ||
        configVal === 'default' ||
        typeof configVal === 'string'
      ) {
        const params = defaultConvertFunctions[key](mergedSelectorData)
        if (params) {
          return {
            ...acc,
            ...params,
          }
        }
      }
      return acc
    },
    {}
  )
  // TODO: still need to return selectorData
  return {
    ...selectorData,
    queryParams,
  }
}

export default convert
