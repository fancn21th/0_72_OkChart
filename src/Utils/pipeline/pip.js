import queryConverter from './queryConverter'
import filterSelectorData from './filterSelectorData'

import buildQueryConverterConfig from '../../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../../Factory/buildFilterSelectorDataConfig'

import dateFilter from './dateFilter'
import buildModelConfig from '../../Factory/buildModelConfig'

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

const viewDataPip_pipeline = [dateFilter]

const viewDataPip_pipeline_context = ({ modelType }) => ({
  modelType,
})

const viewDataPip = ({ selectorData, responseData, totals, modelType }) => {
  const { customConverters } = buildModelConfig({
    type: modelType,
  })
  const pip = [...viewDataPip_pipeline, ...customConverters]
  return pip.reduce(
    (acc, fn) => ({
      ...acc, // last acc
      ...fn({
        ...acc,
      }),
    }),
    {
      context: viewDataPip_pipeline_context({
        modelType,
      }),
      responseData,
      selectorData,
      totals,
    }
  )
}

export { queryDataPip, viewDataPip }
