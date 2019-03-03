import dateFilter from './dateFilter'
import buildModelConfig from '../../Factory/buildModelConfig'
import { isArray } from '../typeHelper'

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

const viewDataPip_universal_pipeline = [dateFilter]

const viewDataPip_pipeline_context = ({ modelType }) => ({
  modelType,
})

const reduce_single_responseData = ({
  response: { rows: responseData, totalsForAllResults, totalResults },
  selectorData,
}) => {
  return viewDataPip_universal_pipeline.reduce(
    (acc, fn) => ({
      ...acc, // last acc
      ...fn({
        ...acc,
      }),
    }),
    {
      responseData,
      selectorData,
      totals: { totalsForAllResults, totalResults },
    }
  )
}

const viewDataPip = ({ responseData, modelType }) => {
  // selectorData, responseData, totals,
  const universal_results = isArray(responseData)
    ? responseData.map(item => reduce_single_responseData(item))
    : reduce_single_responseData(responseData)

  const { customConverters } = buildModelConfig({
    type: modelType,
  })

  return customConverters.reduce(
    (acc, fn) => ({
      ...acc,
      ...fn({
        ...acc,
      }),
    }),
    {
      responseData: universal_results,
      context: viewDataPip_pipeline_context({
        modelType,
      }),
    }
  )
}

export default viewDataPip
