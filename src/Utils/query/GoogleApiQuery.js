import SelectorMap from '../SelectorMap'

const GoogleApiQuery = function(gapi) {
  this.gapi = gapi
  this.cache = new SelectorMap()
}

GoogleApiQuery.prototype = {
  query: function(params, selectorData) {
    const self = this

    if (selectorData && self.cache.has(selectorData)) {
      return new Promise(function(resolve) {
        resolve(self.cache.get(selectorData))
      })
    }

    return new Promise(function(resolve, reject) {
      var data = new self.gapi.analytics.report.Data({
        query: params,
      })
      data
        .once('success', function(response) {
          // TODO: debugger
          console.log('debugger:: response data', response)
          if (selectorData) self.cache.set(selectorData, response)
          resolve(response)
        })
        .once('error', function(response) {
          reject(response)
        })
        .execute()
    })
  },
}

export default GoogleApiQuery
