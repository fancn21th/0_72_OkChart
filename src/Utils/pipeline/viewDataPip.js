import filterDateByWorkingDate from './dateFilter'
import { groupByFieldIdx, sortByFieldIdx } from './dateGrouping'
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

const viewDataPip_universal_pipeline = [
  filterDateByWorkingDate,
  groupByFieldIdx,
  sortByFieldIdx,
]

const viewDataPip_pipeline_context = ({ modelType }) => ({
  modelType,
})

const reduce_single_responseData = ({
  response: { rows: responseData, totalsForAllResults, totalResults },
  selectorData,
  context,
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
      context,
    }
  )
}

const viewDataPip = ({ responseData, modelType }) => {
  const {
      customConverters,
      groupFieldIndex,
      sumFieldIndex,
      sumFieldSort,
    } = buildModelConfig({
      type: modelType,
    }),
    context = { groupFieldIndex, sumFieldIndex, sumFieldSort }

  const universal_results = isArray(responseData)
    ? responseData.map(item => reduce_single_responseData({ ...item, context }))
    : reduce_single_responseData({ ...responseData, context })

  // debugger
  console.log(
    'debugger:: view data - universal data converter',
    universal_results
  )

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
