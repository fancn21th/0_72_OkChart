import buildQueryPip from '../../Factory/buildQueryPip'
import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

const build_query_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

const reduce_single_selectorData = data => {
  const {
      selectorData: { type: viewType },
    } = data,
    context = build_query_context({ viewType })
  return buildQueryPip({ viewType }).reduce(
    (acc, fn) => {
      return {
        ...acc,
        ...fn({
          ...acc,
        }),
      }
    },
    {
      ...data,
      context,
    }
  )
}

const queryDataPip = ({ selectorDataArray }) => {
  return selectorDataArray
    .map(item => ({ selectorData: item }))
    .map(item => reduce_single_selectorData(item))
}

export default queryDataPip
