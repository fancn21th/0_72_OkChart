import events from '../../Utils/events'
import { viewDataPip } from '../../Utils/pipeline/pip'
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
        ({
          rows,
          totalsForAllResults,
          totalResults,
          isResponseDataFromCache = false,
        }) => {
          let data = viewDataPip({
            selectorData,
            responseData: rows,
            totals: { totalsForAllResults, totalResults },
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
