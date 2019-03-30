import buildViewPip from '../../Factory/buildViewPip'
import { debuggger } from '../../Utils/Debugger'

const reduce_single_responseData = data => {
  const {
      selectorData: { type: viewType },
    } = data,
    { universal } = buildViewPip({ viewType })

  return universal.reduce(
    (acc, fn) => ({
      ...acc, // last acc
      ...fn({
        ...acc,
      }),
    }),
    // init input params
    data
  )
}

const viewDataPip = responseDataArray => {
  const universal_view_pipeline_results = responseDataArray.map(item =>
    reduce_single_responseData(item)
  )

  debuggger({
    type: viewType,
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
      viewType,
    },
  }

  debuggger({
    type: viewType,
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
