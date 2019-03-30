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

const universal_convert = responseDataArray =>
  responseDataArray.map(item => reduce_single_responseData(item))

const custom_convert = (viewType, universal_data) => {
  const { custom } = buildViewPip({ viewType })

  return custom.reduce(
    (acc, fn) => ({
      ...acc,
      ...fn({
        ...acc,
      }),
    }),
    universal_data
  )
}

const viewDataPip = responseDataArray => {
  const viewType = responseDataArray[0].context.viewType,
    universal_results = universal_convert(responseDataArray)

  debuggger({
    type: viewType,
    title: 'universal results',
    data: universal_results,
  })

  // TODO: just for dev ux
  const custom_input = {
    responseDataSolo:
      universal_results.length === 1 ? universal_results[0] : null,
    responseDataArray:
      universal_results.length === 1 ? null : universal_results,
  }

  debuggger({
    type: viewType,
    title: 'custom converter input',
    data: custom_input,
  })

  return custom_convert(viewType, custom_input)
}

export default viewDataPip
