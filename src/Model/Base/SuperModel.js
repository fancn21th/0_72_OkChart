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
          ({
            query: queryParams,
            filteredSelectorData: keyData,
            selectorData,
          }) => ({
            queryParams,
            keyData,
            selectorData,
          })
        )
      : {
          queryParams: queryData.query,
          keyData: queryData.filteredSelectorData,
          selectorData: queryData.selectorData,
        }

    this.query.query(queryParams).then(responseDataArray => {
      console.log('debugger:: response data array', responseDataArray)
      const data = viewDataPip({
        responseDataArray,
        modelType: this.modelType,
      })
      console.log('debugger:: view data', data)
      events.notify(this.modelType, {
        key: this.modelType,
        data,
      })
    })
  },
}

export default SuperModel
export { inheritPrototype }
