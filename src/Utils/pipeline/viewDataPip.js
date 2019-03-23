import buildViewPip from '../../Factory/buildViewPip'
import buildModelConfig from '../../Factory/buildModelConfig'
import { debuggger } from '../../Utils/Debugger'

const viewDataPip_pipeline_context = ({ modelType }) => ({
  modelType,
})

const reduce_single_responseData = ({
  response: { rows: responseData, totalsForAllResults, totalResults },
  selectorData,
  context,
  modelType,
}) => {
  return buildViewPip({ viewType: modelType }).reduce(
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
      groupFieldIndex,
      sumFieldIndex,
      sortField,
      customConverters,
    } = buildModelConfig({
      type: modelType,
    }),
    context = { groupFieldIndex, sumFieldIndex, sortField }

  const universal_view_pipeline_results = responseDataArray.map(item =>
    reduce_single_responseData({ ...item, context, modelType })
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
    context: viewDataPip_pipeline_context({
      modelType,
    }),
  }

  debuggger({
    type: modelType,
    title: 'custom converter input',
    data: customConverters_input,
  })

  return customConverters.reduce(
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
