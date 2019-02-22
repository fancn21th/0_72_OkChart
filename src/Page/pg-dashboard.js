import events from '../Utils/events'
import buildView from '../Factory/buildView'
import buildModel from '../Factory/buildModel'
import buildQueryConverterConfig from '../Factory/buildQueryConverterConfig'
import DashboardPresenter from '../Presenter/p-dashboard'

const Page = function({ viewElements, query }) {
  const { charts, authenticator, viewSelector } = viewElements
  this.chartsOption = charts
  this.authenticator = authenticator
  this.viewSelector = viewSelector
  this.query = query
  this.views = {}
  this.models = {}
  this.queryConverterConfigs = {}
}

Page.prototype = {
  init: function() {
    // common components on page and not under control by presenter
    this.authenticator.init({
      onSignIn: () => {
        this.authenticator.hide()
      },
      onSignOut: () => {
        this.authenticator.show()
      },
    })
    this.viewSelector.init({
      onChange: ids => {
        events.notify('ids', { ids })
      },
    })
    this.chartsOption.forEach(chart => {
      // build view based on type
      this.views[chart.type] = buildView({
        type: chart.type,
        containerId: chart.container,
      })
      // build model based on type
      this.models[chart.type] = buildModel({
        type: chart.type,
        query: this.query,
      })
      this.queryConverterConfigs[chart.type] = buildQueryConverterConfig({
        type: chart.type,
      })
    })
    // single presenter
    const dashboardPresenter = new DashboardPresenter({
      views: this.views,
      models: this.models,
      queryConverterConfigs: this.queryConverterConfigs,
    })
    dashboardPresenter.init()
  },
}

export default Page
