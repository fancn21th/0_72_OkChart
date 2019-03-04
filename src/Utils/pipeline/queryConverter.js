import { isFunction } from '../../Utils/typeHelper'

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

const date = ({ timespan, startDate, endDate }) => {
  const startDateStr = startDate || `${timespan || '30'}daysAgo`
  const enDateStr = endDate || 'yesterday'
  return {
    'start-date': startDateStr,
    'end-date': enDateStr,
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
