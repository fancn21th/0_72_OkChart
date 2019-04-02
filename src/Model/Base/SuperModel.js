import events from '../../Utils/events'
import { viewDataPip } from '../../Utils/pipeline/pip'
import inheritPrototype from '../../Utils/inheritPrototype'
import { debuggger } from '../../Utils/Debugger'

const SuperModel = function({ query, modelType }) {
  this.query = query
  this.modelType = modelType
}

SuperModel.prototype = {
  fetch: function(queryData) {
    this.query.query(queryData).then(responseDataArray => {
      debuggger({
        type: responseDataArray[0].selectorData.type,
        title: 'response data array',
        data: responseDataArray,
      })
      const data = viewDataPip(responseDataArray)
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
