import events from '../../Utils/events'
import { viewDataPip } from '../../Utils/pipeline/pip'
import inheritPrototype from '../../Utils/inheritPrototype'

const SuperModel = function({ query, modelType }) {
  this.query = query
  this.modelType = modelType
}

SuperModel.prototype = {
  fetch: function({ query: queryParams, selectorData, filteredSelectorData }) {
    this.query
      .query({ params: queryParams, keyData: filteredSelectorData })
      .then(
        ({
          rows,
          totalsForAllResults,
          totalResults,
          isResponseDataFromCache = false,
        }) => {
          const data = viewDataPip({
            selectorData,
            responseData: rows,
            totals: { totalsForAllResults, totalResults },
            modelType: this.modelType,
          })
          data.isResponseDataFromCache = isResponseDataFromCache
          console.log('debugger:: view data', data)
          events.notify(this.modelType, {
            key: this.modelType,
            data,
          })
        }
      )
  },
}

export default SuperModel
export { inheritPrototype }
