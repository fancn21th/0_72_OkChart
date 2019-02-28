import SelectorMap from '../SelectorMap'

const GoogleApiQuery = function(gapi) {
  this.gapi = gapi
  this.cache = new SelectorMap()
}

GoogleApiQuery.prototype = {
  _hasData: function(keyData) {
    return keyData && this.cache.has(keyData)
  },
  _cacheData: function(key, data) {
    this.cache.set(key, data)
  },
  _getData: function(keyData) {
    return this.cache.get(keyData)
  },
  query: function({ params, keyData }) {
    const self = this

    if (this._hasData(keyData)) {
      return new Promise(function(resolve) {
        resolve(self._getData(keyData))
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
          if (keyData) self._cacheData(keyData, response)
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
