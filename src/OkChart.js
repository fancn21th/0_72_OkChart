import GoogleApiQuery from './Utils/GoogleApiQuery'
import GoogleApiAuthenticator from './Utils/GoogleApiAuthenticator'
import GoogleApiViewSelector from './Utils/GoogleApiViewSelector'
import Dashboard from './Page/p-dashboard'

const OkChart = function({ willMount }) {
  this.willMount = willMount
}

OkChart.prototype = {
  init: function({ clientId, authContainer, viewSelector, charts }) {
    this.willMount()

    gapi.analytics.ready(function() {
      // google api wrapper
      const googleApiQuery = new GoogleApiQuery(gapi)
      const googleApiAuthenticator = new GoogleApiAuthenticator({
        gapi,
        containerId: authContainer,
        clientId,
      })
      const googleApiViewSelector = new GoogleApiViewSelector({
        gapi,
        containerId: viewSelector,
      })

      // view elements
      const viewElements = {
        charts,
        authenticator: googleApiAuthenticator,
        viewSelector: googleApiViewSelector,
      }
      // dashboard page
      const dashboard = new Dashboard({
        viewElements,
        query: googleApiQuery,
      })

      dashboard.init()
    })
  },
}

export default OkChart
