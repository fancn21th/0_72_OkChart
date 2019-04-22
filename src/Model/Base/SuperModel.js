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
    // TODO: this is for test purpose only
    // $.get(
    //   'http://www.devokchem2.com/admin/member/member_search?keyword=joe',
    //   function(data) {
    //     console.log(data)
    //   }
    // )
    this.query(this.modelType)
      .query(queryData)
      .then(responseDataArray => {
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
