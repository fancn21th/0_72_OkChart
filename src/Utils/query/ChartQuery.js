import SelectorMap from '../SelectorMap'
import { debuggger } from '../../Utils/Debugger'

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
  _getPromise: function(queryData) {
    const {
      filteredSelectorData: keyData,
      query: queryParams,
      selectorData,
      context,
    } = queryData

    const self = this

    if (this._hasData(keyData)) {
      return new Promise(function(resolve) {
        debuggger({
          type: selectorData.type,
          title: 'ga response data',
          data: self._getData(keyData),
        })
        const response = self._getData(keyData)
        resolve({
          ...queryData,
          response,
          responseData: response.rows,
          context: {
            ...context,
            isResponseDataFromCache: true,
          },
        })
      })
    }

    return new Promise(function(resolve, reject) {
      var data = new self.gapi.analytics.report.Data({
        query: queryParams,
      })
      data
        .once('success', function(response) {
          if (keyData) self._cacheData(keyData, response)
          debuggger({
            type: selectorData.type,
            title: 'ga response data',
            data: response,
          })
          resolve({
            ...queryData,
            response,
            responseData: response.rows,
            context: {
              ...context,
              isResponseDataFromCache: false,
            },
          })
        })
        .once('error', function(response) {
          reject({ response, error: 'Chart Query Error' })
        })
        .execute()
    })
  },
  query: function(queryData) {
    return Promise.all(queryData.map(item => this._getPromise(item)))
  },
}

export default ChartQuery
