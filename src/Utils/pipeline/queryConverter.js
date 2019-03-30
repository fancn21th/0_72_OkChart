import { isFunction } from '../typeHelper'
import { doubleTimespanStartDate } from '../TimeHelper'

const ids = ({ ids }) => ({ ids })

const metrics = queryData => {
  const { metrics: metricsConfig } = queryData
  return isFunction(metricsConfig)
    ? {
        metrics: metricsConfig(queryData),
      }
    : {
        metrics: metricsConfig,
      }
}

const dimensions = queryData => {
  const { workingDate, dimensions: dimensionsConfig } = queryData,
    dimensionsStr = isFunction(dimensionsConfig)
      ? dimensionsConfig(queryData)
      : dimensionsConfig
  if (workingDate === true && !dimensionsStr.includes('ga:date')) {
    return {
      dimensions: `ga:date,${dimensionsStr}`,
      context: { gaDateAppend: true },
    }
  }
  return {
    dimensions: dimensionsStr,
    context: { gaDateAppend: false },
  }
}

// TODO: isDoubleTimespan moving out
const date = ({ timespan, startDate, endDate, isDoubleTimespan }) => {
  let startDateStr, endDateStr

  if (isDoubleTimespan) {
    timespan = parseInt(timespan || '30', 10) * 2
    startDate =
      startDate && endDate
        ? doubleTimespanStartDate(startDate, endDate)
        : startDate
    startDateStr = startDate || `${timespan || '30'}daysAgo`
    endDateStr = endDate || 'yesterday'
  } else {
    startDateStr = startDate || `${timespan || '30'}daysAgo`
    endDateStr = endDate || 'yesterday'
  }

  return {
    'start-date': startDateStr,
    'end-date': endDateStr,
  }
}

const sort = queryData => {
  const { sort: sortConfig } = queryData
  return isFunction(sortConfig)
    ? {
        sort: sortConfig(queryData),
      }
    : {
        sort: sortConfig,
      }
}

const maxResult = () => ({
  'max-results': 10000,
})

const query_converter_pipeline = [
  ids,
  metrics,
  dimensions,
  date,
  sort,
  maxResult,
]

const convert = data => {
  const {
      context,
      selectorData: { ids },
    } = data,
    { buildQueryConverterConfig, viewType } = context,
    config = buildQueryConverterConfig({ type: viewType })

  if (!config) {
    throw new Error('OKCHART::ERROR:: query converter is not defined.')
  }
  // the reducer below does not conform to the pattern
  // that output of per-function will be the input of next-function
  const query = query_converter_pipeline.reduce(
      (acc, fn) => ({
        ...acc,
        ...fn(acc),
      }),
      {
        ids,
        ...config,
        context: {},
      }
    ),
    { context: queryConverterContext } = query

  delete query.context

  return {
    ...data,
    query,
    context: {
      ...context,
      ...queryConverterContext,
    },
  }
}

export default convert
