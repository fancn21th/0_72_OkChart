import queryConverter from './queryConverter'
import filterSelectorData from './filterSelectorData'

import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

import { isArray } from '../typeHelper'

const query_data_pipeline_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

const query_data_pipeline = [filterSelectorData, queryConverter]

const reduce_single_selectorData = ({ viewType, selectorData }) =>
  query_data_pipeline.reduce(
    (acc, fn) => {
      return {
        ...acc,
        ...fn({
          ...acc,
        }),
      }
    },
    {
      context: query_data_pipeline_context({ viewType }),
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
