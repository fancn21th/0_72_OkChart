import queryConverter from './queryConverter'
import filterSelectorData from './filterSelectorData'

import convertData from './dataConverter'

import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

const query_data_pipeline_context = ({ viewType }) => ({
  buildQueryConverterConfig,
  buildFilterSelectorDataConfig,
  viewType,
})

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

const query_data_pipeline = [queryConverter, filterSelectorData]

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

const viewDataPip = ({
  selectorData,
  responseData,
  totals,
  customConverters,
}) =>
  convertData({
    selectorData,
    responseData,
    totals,
    customConverters,
  })

export { queryDataPip, viewDataPip }
