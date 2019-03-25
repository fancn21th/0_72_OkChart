import events from '../../Utils/events'
import { viewDataPip } from '../../Utils/pipeline/pip'
import inheritPrototype from '../../Utils/inheritPrototype'
import { isArray } from '../../Utils/typeHelper'
import { debuggger } from '../../Utils/Debugger'

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
      debuggger({
        type: responseDataArray[0].selectorData.type,
        title: 'response data array',
        data: responseDataArray,
      })
      const data = viewDataPip({
        responseDataArray,
        modelType: this.modelType,
        queryData: queryData.query, // insert the query data back to pipeline
      })
      debuggger({
        type: responseDataArray[0].selectorData.type,
        title: 'view data',
        data,
      })
      events.notify(this.modelType, {
        key: this.modelType,
        data,
      })
    })
  },
}

export default SuperModel
export { inheritPrototype }
