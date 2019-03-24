import buildViewPip from '../../Factory/buildViewPip'
import buildModelConfig from '../../Factory/buildModelConfig'
import { debuggger } from '../../Utils/Debugger'

const reduce_single_responseData = ({
  response: { rows: responseData, totalsForAllResults, totalResults },
  selectorData,
  universal,
  modelType,
}) => {
  const { groupFieldIndex, sumFieldIndex, sortField } = buildModelConfig({
      type: modelType,
    }),
    context = { groupFieldIndex, sumFieldIndex, sortField }

  return universal.reduce(
    (acc, fn) => ({
      ...acc, // last acc
      ...fn({
        ...acc,
      }),
    }),
    // init input params
    {
      responseData,
      selectorData,
      totals: { totalsForAllResults, totalResults },
      context,
    }
  )
}

const viewDataPip = ({ responseDataArray, modelType }) => {
  const { universal, custom } = buildViewPip({ viewType: modelType }),
    // universal data converter
    // apply pipeline for each response data
    universal_view_pipeline_results = responseDataArray.map(item =>
      reduce_single_responseData({ ...item, modelType, universal })
    )

  debuggger({
    type: modelType,
    title: 'universal results',
    data: universal_view_pipeline_results,
  })

  const customConverters_input = {
    responseDataSolo:
      universal_view_pipeline_results.length === 1
        ? universal_view_pipeline_results[0]
        : null,
    responseDataArray:
      universal_view_pipeline_results.length === 1
        ? null
        : universal_view_pipeline_results,
    context: {
      modelType,
    },
  }

  debuggger({
    type: modelType,
    title: 'custom converter input',
    data: customConverters_input,
  })

  return custom.reduce(
    (acc, fn) => ({
      ...acc,
      ...fn({
        ...acc,
      }),
    }),
    customConverters_input
  )
}

export default viewDataPip
