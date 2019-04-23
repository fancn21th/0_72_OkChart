import SelectorMap from '../SelectorMap'
import { debuggger } from '../../Utils/Debugger'
import fixQuery from '../../Utils/OkQueryFixer'

const ChartQuery = function() {
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
          title: 'okchem response data',
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
      const fixedQueryParams = fixQuery(queryParams, selectorData)

      const queryString = Object.keys(fixedQueryParams)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              fixedQueryParams[key]
            )}`
        )
        .join('&')

      $.ajax({
        type: 'GET',
        url: `http://www.devokchem2.com/analytic/v1/data/oka?${queryString}`,
        // url: `http://localhost:3000/data`,
        // contentType: 'application/json; charset=utf-8',
        // dataType: 'json',
        success: function(response) {
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
        },
        failure: function(response) {
          reject({ response, error: 'Chart Query Error' })
        },
      })
    })
  },
  query: function(queryData) {
    return Promise.all(queryData.map(item => this._getPromise(item)))
  },
}

export default ChartQuery
