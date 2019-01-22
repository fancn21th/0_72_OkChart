import events from '../Utils/events'
import buildView from '../Factory/buildView'
import buildModel from '../Factory/buildModel'
import DashboardPresenter from '../Presenter/p-dashboard'

const Page = function({ viewElements, query }) {
  const { charts, authenticator, viewSelector } = viewElements
  this.charts = charts
  this.authenticator = authenticator
  this.viewSelector = viewSelector
  this.query = query
  this.views = []
  this.models = {}
}

Page.prototype = {
  init: function() {
    // common components on page and not under control by presenter
    this.authenticator.init()
    this.viewSelector.init({
      onChange: ids => {
        events.notify('ids', { ids })
      },
    })
    this.charts.forEach(chart => {
      // build view based on type
      this.views.push(
        buildView({
          type: chart.type,
          containerId: chart.container,
        })
      )
      // build model based on type
      this.models[chart.type] = buildModel({
        type: chart.type,
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
