import events from '../Utils/events'
import buildView from '../Factory/buildView'
import buildModel from '../Factory/buildModel'
import DashboardPresenter from '../Presenter/p-dashboard'

const Page = function({ viewElements, query }) {
  const { charts, authenticator, viewSelector } = viewElements
  this.chartsOption = charts
  this.authenticator = authenticator
  this.viewSelector = viewSelector
  this.query = query

  this.views = {}
  this.models = {}
}

Page.prototype = {
  init: function() {
    // common components that are not under control by presenter
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
      const { type } = chart
      // build view based on type
      this.views[type] = buildView({
        type,
        containerId: chart.container,
      })
      // build model based on type
      this.models[type] = buildModel({
        type,
        query: this.query,
      })
    })
    // single presenter
    const dashboardPresenter = new DashboardPresenter({
      views: this.views,
      models: this.models,
    })
    dashboardPresenter.init()
  },
}

export default Page
