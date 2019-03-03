// helper
const isFunction = function(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

const ids = ({ ids }) => ({ ids })
const metrics = ({ metrics: metricsConfig, context }) =>
  isFunction(metricsConfig) ? metricsConfig(context) : metricsConfig

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
const sort = () => null
const maxResult = () => ({
  'max-results': 10000,
})

const pipeline = [ids, metrics, dimensions, date, sort, maxResult]

const convert = ({
  selectorData,
  context: { buildQueryConverterConfig, viewType },
}) => {
  const config = buildQueryConverterConfig({ type: viewType })
  if (!config) {
    throw new Error('OKCHART::ERROR:: query converter is not defined.')
  }
  const mergedSelectorData = {
    ...config,
    ...selectorData,
    context: selectorData,
  }
  return {
    query: pipeline.reduce((acc, fn) => {
      return {
        ...acc,
        ...fn(mergedSelectorData),
      }
    }, {}),
  }
}

export default convert
