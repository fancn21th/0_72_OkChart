const ids = ({ ids }) => ({ ids })
const metrics = ({ metrics }) => ({ metrics })
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
  // TODO: remove later
  if (!config) {
    return {
      ...selectorData,
    }
  }
  const mergedSelectorData = {
    ...config,
    ...selectorData,
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
