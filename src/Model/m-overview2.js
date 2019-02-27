import events from '../Utils/events'
import converter from '../Utils/pipeline/dataConverter'
import config from '../Config/DataConverter/cfg-dc-overview'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function({ query: queryParams, selectorData, filteredSelectorData }) {
    this.query
      .query(queryParams, filteredSelectorData)
      .then(
        ({ rows, totalsForAllResults, isResponseDataFromCache = false }) => {
          let data = converter({
            selectorData,
            queryParams,
            responseData: rows,
            totals: totalsForAllResults,
            config,
          })
          data.isResponseDataFromCache = isResponseDataFromCache
          console.log('debugger:: view data', data)
          events.notify('overview', {
            key: 'overview',
            data,
          })
        }
      )
  },
}

export default Model
