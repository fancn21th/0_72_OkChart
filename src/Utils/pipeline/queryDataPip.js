import buildQueryPip from '../../Factory/buildQueryPip'
import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

import { isArray } from '../typeHelper'

const build_query_data_pipeline_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

const reduce_single_selectorData = ({ viewType, selectorData }) =>
  buildQueryPip({ viewType }).reduce(
    (acc, fn) => {
      return {
        ...acc,
        ...fn({
          ...acc,
        }),
      }
    },
    {
      context: build_query_data_pipeline_context({ viewType }),
      selectorData,
    }
  )

const queryDataPip = ({ viewType, selectorData }) => {
  return isArray(selectorData)
    ? selectorData.map(item =>
        reduce_single_selectorData({ viewType, selectorData: item })
      )
    : reduce_single_selectorData({ viewType, selectorData })
}

export default queryDataPip
