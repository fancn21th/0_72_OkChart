import events from '../Utils/events'
import converter from '../Utils/pipeline/dataConverter'
import config from '../Config/DataConverter/cfg-dc-overview'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function({ query: queryParams, selectorData }) {
    this.query.query(queryParams).then(({ rows, totalsForAllResults }) => {
      const data = converter({
        selectorData,
        queryParams,
        responseData: rows,
        totals: totalsForAllResults,
        config,
      })
      console.log('debugger:: view data', data)
      events.notify('overview', {
        key: 'overview',
        data,
      })
    })
  },
}

export default Model
