import events from '../../Utils/events'
import converter from '../../Utils/pipeline/dataConverter'
import inheritPrototype from '../../Utils/inheritPrototype'

const SuperModel = function({ query, config }) {
  this.query = query
  this.config = config
}

SuperModel.prototype = {
  fetch: function({ query: queryParams, selectorData, filteredSelectorData }) {
    const { customConverters, viewType } = this.config
    this.query
      .query({ params: queryParams, keyData: filteredSelectorData })
      .then(
        ({ rows, totalsForAllResults, isResponseDataFromCache = false }) => {
          let data = converter({
            selectorData,
            queryParams,
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
