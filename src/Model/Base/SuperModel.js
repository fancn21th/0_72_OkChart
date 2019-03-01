import events from '../../Utils/events'
import convertData from '../../Utils/pipeline/dataConverter'
import inheritPrototype from '../../Utils/inheritPrototype'

const SuperModel = function({ query, config }) {
  this.query = query
  this.config = config
}

/*
  Data Flow in Model
    input:
      query, selector, filteredSelector
      ====>
      request data from ga
        input:
          queryParams(from query), cache key(from filteredSelector)
        output:
          response, cache state
      ====>
      data convert for view
        input:
          selector, response, totals, config (customConverters)
    ====>
    output:
      view data
*/
SuperModel.prototype = {
  fetch: function({ query: queryParams, selectorData, filteredSelectorData }) {
    const { customConverters, viewType } = this.config
    this.query
      .query({ params: queryParams, keyData: filteredSelectorData })
      .then(
        ({ rows, totalsForAllResults, isResponseDataFromCache = false }) => {
          let data = convertData({
            selectorData,
            responseData: rows,
            totals: totalsForAllResults,
            customConverters,
          })
          data.isResponseDataFromCache = isResponseDataFromCache
          console.log('debugger:: view data', data)
          events.notify(viewType, {
            key: viewType,
            data,
          })
        }
      )
  },
}

export default SuperModel
export { inheritPrototype }
