import dateFilter from './dateFilter'
import buildModelConfig from '../../Factory/buildModelConfig'

/*
  Data Flow in Model
    input:
      query, selector, filteredSelector
      ======>
      request data from ga
        input:
          queryParams(from query), cache key(from filteredSelector)
        output:
          response, cache state
      ======>
      data convert for view
        input:
          selector, response, totals, config (customConverters)
    ======>
    output:
      view data
*/

const viewDataPip_pipeline = [dateFilter]

const viewDataPip_pipeline_context = ({ modelType }) => ({
  modelType,
})

const viewDataPip = ({ selectorData, responseData, totals, modelType }) => {
  const { customConverters } = buildModelConfig({
    type: modelType,
  })
  const pip = [...viewDataPip_pipeline, ...customConverters]
  return pip.reduce(
    (acc, fn) => ({
      ...acc, // last acc
      ...fn({
        ...acc,
      }),
    }),
    {
      context: viewDataPip_pipeline_context({
        modelType,
      }),
      responseData,
      selectorData,
      totals,
    }
  )
}

export default viewDataPip
