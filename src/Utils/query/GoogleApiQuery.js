import SelectorMap from '../SelectorMap'

const GoogleApiQuery = function(gapi) {
  this.gapi = gapi
  this.cache = new SelectorMap()
}

GoogleApiQuery.prototype = {
  _hasData: function(selectorData) {
    return selectorData && this.cache.has(selectorData)
  },
  _cacheData: function(key, data) {
    this.cache.set(key, data)
  },
  _getData: function(selectorData) {
    return this.cache.get(selectorData)
  },
  query: function(params, selectorData) {
    const self = this

    if (this._hasData(selectorData)) {
      return new Promise(function(resolve) {
        resolve(self._getData(selectorData))
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
          if (selectorData) self._cacheData(selectorData, response)
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
