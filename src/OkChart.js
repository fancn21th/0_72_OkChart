import { buildQuery } from './Utils/query/queryBuilder'
import GoogleApiAuthenticator from './Utils/GoogleApiAuthenticator'
import GoogleApiViewSelector from './Utils/GoogleApiViewSelector'
import Dashboard from './Page/pg-dashboard'

const OkChart = function({ willMount }) {
  this.willMount = willMount
}

OkChart.prototype = {
  init: function({ clientId, authContainer, viewSelector, charts }) {
    // jquery ajax setup for custom api request
    $.ajaxSetup({
      traditional: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      xhrFields: {
        withCredentials: true,
      },
    })

    this.willMount()

    gapi.analytics.ready(function() {
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
        query: buildQuery({ gapi }),
      })

      dashboard.init()
    })
  },
}

export default OkChart
