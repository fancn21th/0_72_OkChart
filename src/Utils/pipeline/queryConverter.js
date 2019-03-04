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

const dimensions = ({ workingDate, dimensions }) => {
  if (workingDate === true) {
    return {
      dimensions: `ga:date,${dimensions}`,
    }
  }
  return {
    dimensions,
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

const query_params_gen_pipeline = [
  ids,
  metrics,
  dimensions,
  date,
  sort,
  maxResult,
]

const convert = ({
  selectorData,
  context: { buildQueryConverterConfig, viewType },
}) => {
  const config = buildQueryConverterConfig({ type: viewType })
  if (!config) {
    throw new Error('OKCHART::ERROR:: query converter is not defined.')
  }
  return {
    query: query_params_gen_pipeline.reduce(
      (acc, fn) => ({
        ...acc,
        ...fn(acc),
      }),
      {
        ...config,
        ...selectorData,
      }
    ),
  }
}

export default convert
