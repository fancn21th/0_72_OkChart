import buildQueryPip from '../../Factory/buildQueryPip'
import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

import { isArray } from '../typeHelper'

const build_query_data_pipeline_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

const reduce_single_selectorData = data => {
  const {
      selectorData: { type: viewType },
    } = data,
    context = build_query_data_pipeline_context({ viewType })
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

const queryDataPip = data => {
  return isArray(data)
    ? selectorData.map(item => reduce_single_selectorData(item))
    : reduce_single_selectorData(data)
}

export default queryDataPip
