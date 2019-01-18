import GoogleApiQuery from './Utils/GoogleApiQuery'
import GoogleApiAuthenticator from './Utils/GoogleApiAuthenticator'
import GoogleApiViewSelector from './Utils/GoogleApiViewSelector'
import PvUvModel from './Model/m-pv-uv'
import PvUvView from './View/v-pv-uv'
import PvUvPresenter from './Presenter/p-pv-uv'
import PvUvChart from './Chart/c-pv-uv'
import SelectorPvUv from './Selector/sel-pv-uv'

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
      // TODO: Multiple Chart Solution is to be continuted
      const char1 = charts[0]
      // chart
      const pvUvChart = new PvUvChart({
        chartContainerId: char1.container,
      })
      // model
      const pvUvModel = new PvUvModel(googleApiQuery)
      // view elements
      const selectorPvUv = new SelectorPvUv({
        chartContainerId: char1.container,
      })
      const elements = {
        chart: pvUvChart,
        authenticator: googleApiAuthenticator,
        viewSelector: googleApiViewSelector,
        chartSelector: selectorPvUv,
      }
      const pvUvView = new PvUvView(elements)
      // presenter
      const pvUvPresenter = new PvUvPresenter(pvUvModel, pvUvView)
      pvUvPresenter.init()
    })
  },
}

export default OkChart
