import SelectorMap from '../SelectorMap'
import { isArray } from '../typeHelper'

// TODO: move gapi out and make it abstract
const ChartQuery = function(gapi) {
  this.gapi = gapi
  this.cache = new SelectorMap()
}

ChartQuery.prototype = {
  _hasData: function(keyData) {
    return keyData && this.cache.has(keyData)
  },
  _cacheData: function(key, data) {
    this.cache.set(key, data)
  },
  _getData: function(keyData) {
    return this.cache.get(keyData)
  },
  _getPromise: function({ keyData, queryParams, selectorData }) {
    const self = this

    if (this._hasData(keyData)) {
      return new Promise(function(resolve) {
        resolve(self._getData(keyData))
      })
    }

    return new Promise(function(resolve, reject) {
      var data = new self.gapi.analytics.report.Data({
        query: queryParams,
      })
      data
        .once('success', function(response) {
          // TODO: debugger
          console.log('debugger:: response data', response)
          if (keyData) self._cacheData(keyData, { response, selectorData })
          resolve({ response, selectorData })
        })
        .once('error', function(response) {
          reject({ response, selectorData })
        })
        .execute()
    })
  },
  query: function(queryParams) {
    const promises = []

    if (isArray(queryParams)) {
      queryParams.forEach(item => {
        promises.push(this._getPromise(item))
      })
    } else {
      promises.push(this._getPromise(queryParams))
    }

    return Promise.all(promises)
  },
}

export default ChartQuery
