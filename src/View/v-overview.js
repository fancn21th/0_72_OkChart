import SuperView, { inheritPrototype } from './Base/SuperView'
import OverviewChart from './Chart/c-overview2'
import OverviewSelector from './Selector/sel-overview'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '概况' })
  this.chart = new OverviewChart({ chartContainerId: this.chartWrapperId })
  this.selector = new OverviewSelector({
    chartContainerId: this.selectorWrapperId,
  })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({
    data,
    sourceFilterCollection,
    countryFilterCollection,
    responseDataSolo: {
      selectorData: { isQuerySelector },
    },
  }) {
    this.chart.render({
      data,
    })
    // no need to update selector when fetching data from cache
    if (isQuerySelector) {
      this.selector.render({
        sourceFilterCollection,
        countryFilterCollection,
      })
    }
  },
}

export default View
