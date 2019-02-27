import events from '../Utils/events'
import buildView from '../Factory/buildView'
import buildModel from '../Factory/buildModel'
import buildDefaultSelector from '../Factory/buildDefaultSelector'
import buildQueryConverterConfig from '../Factory/buildQueryConverterConfig'
import buildFilterSelectorDataConfig from '../Factory/buildFilterSelectorDataConfig'
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
  this.filterSelectorDataConfigs = {}
  this.defaultSelectors = {}
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
      // build query converter config
      this.queryConverterConfigs[type] = buildQueryConverterConfig({
        type,
      })
      // build filter selector data config
      this.filterSelectorDataConfigs[type] = buildFilterSelectorDataConfig({
        type,
      })
      // build default selector for each view
      this.defaultSelectors[type] = buildDefaultSelector({
        type,
      })
    })
    // single presenter
    const dashboardPresenter = new DashboardPresenter({
      views: this.views,
      models: this.models,
      queryConverterConfigs: this.queryConverterConfigs,
      defaultSelectors: this.defaultSelectors,
      filterSelectorDataConfigs: this.filterSelectorDataConfigs,
    })
    dashboardPresenter.init()
  },
}

export default Page
