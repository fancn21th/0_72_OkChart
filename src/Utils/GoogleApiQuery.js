const GoogleApiQuery = function(gapi) {
  this.gapi = gapi
}

GoogleApiQuery.prototype = {
  query: function(params) {
    const self = this

    return new Promise(function(resolve, reject) {
      var data = new self.gapi.analytics.report.Data({
        query: params,
      })
      data
        .once('success', function(response) {
          // TODO: debugger
          console.log('debugger:: response', response)
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
