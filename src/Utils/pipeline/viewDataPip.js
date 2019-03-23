import filterDateByWorkingDate from './dateFilter'
import { groupByFieldIdx, sortByFieldIdx } from './dateGrouping'
import buildModelConfig from '../../Factory/buildModelConfig'
import { debuggger } from '../../Utils/Debugger'

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

const viewDataPip = ({ responseDataArray, modelType }) => {
  const {
      customConverters,
      groupFieldIndex,
      sumFieldIndex,
      sortField,
    } = buildModelConfig({
      type: modelType,
    }),
    context = { groupFieldIndex, sumFieldIndex, sortField }

  const universal_results = responseDataArray.map(item =>
    reduce_single_responseData({ ...item, context })
  )

  debuggger({
    type: modelType,
    title: 'view data::before custom data convert',
    data: universal_results,
  })

  return customConverters.reduce(
    (acc, fn) => ({
      ...acc,
      ...fn({
        ...acc,
      }),
    }),
    {
      responseDataSolo:
        universal_results.length === 1 ? universal_results[0] : null,
      responseDataArray:
        universal_results.length === 1 ? null : universal_results,
      context: viewDataPip_pipeline_context({
        modelType,
      }),
    }
  )
}

export default viewDataPip
