import { isFunction } from '../typeHelper'
import { doubleTimespanStartDate } from '../TimeHelper'

const ids = ({ selectorData: { ids } }) => ({ ids })

const metrics = queryData => {
  const { metrics } = queryData
  return isFunction(metrics)
    ? {
        metrics: metrics(queryData),
      }
    : {
        metrics: metrics,
      }
}

const dimensions = queryData => {
  const {
      selectorData: { workingDate },
      dimensions,
    } = queryData,
    dimensionsStr = isFunction(dimensions) ? dimensions(queryData) : dimensions

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
const date = ({
  selectorData: { timespan, startDate, endDate, isDoubleTimespan },
}) => {
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
  const { sort } = queryData
  return isFunction(sort)
    ? {
        sort: sort(queryData),
      }
    : {
        sort: sort,
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
  const { selectorData, context } = data,
    { buildQueryConverterConfig, viewType } = context,
    queryConverterConfig = buildQueryConverterConfig({ type: viewType })

  if (!queryConverterConfig) {
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
        selectorData,
        ...queryConverterConfig, // spread config other than putting it into the context is for simplicity of the query converter pipeline
        context: {},
      }
    ),
    { context: queryConverterContext } = query

  delete query.context
  delete query.selectorData

  // merge all data
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
