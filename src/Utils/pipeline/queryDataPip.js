import queryConverter from './queryConverter'
import filterSelectorData from './filterSelectorData'

import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

/*
  Data Flow in View
    input:
      selectorData
      context (
        viewType,
        buildQueryConverterConfig,
        buildFilterSelectorDataConfig
      )
      ======>
        queryConverter
          input:
            selectorData
            context (
              viewType,
              buildQueryConverterConfig,
            )
          output:
            query
      ======>
        filterSelectorData
          input:
            selectorData
            context (
              viewType,
              buildFilterSelectorDataConfig,
            )
          output:
            filteredSelectorData
    ======>
    output:
      query,
      filteredSelectorData,
      selectorData,
      context
*/

const query_data_pipeline_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

const query_data_pipeline = [filterSelectorData, queryConverter]

const queryDataPip = ({ viewType, selectorData }) => {
  return query_data_pipeline.reduce(
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
}

export default queryDataPip
