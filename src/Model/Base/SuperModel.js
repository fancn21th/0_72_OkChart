import events from '../../Utils/events'
import { viewDataPip } from '../../Utils/pipeline/pip'
import inheritPrototype from '../../Utils/inheritPrototype'
import { isArray } from '../../Utils/typeHelper'

const SuperModel = function({ query, modelType }) {
  this.query = query
  this.modelType = modelType
}

SuperModel.prototype = {
  fetch: function(queryData) {
    const queryParams = isArray(queryData)
      ? queryData.map(
          ({ query: queryParams, filteredSelectorData: keyData }) => ({
            queryParams,
            keyData,
          })
        )
      : {
          queryParams: queryData.query,
          keyData: queryData.filteredSelectorData,
        }
    this.query
      .query(queryParams)
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
