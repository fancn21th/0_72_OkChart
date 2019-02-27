import SuperView, { inheritPrototype } from './Base/SuperView'
import OverviewChart from './Chart/c-overview'
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
    pv,
    uv,
    buyerCount,
    supplierCount,
    source, // TODO: Bad Naming
    country, // TODO: Bad Naming
    isResponseDataFromCache,
  }) {
    this.chart.render({
      pv,
      uv,
      buyerCount,
      supplierCount,
    })
    // no need to update selector when fetching data from cache
    if (!isResponseDataFromCache) {
      this.selector.render({
        source,
        country,
      })
    }
  },
}

export default View
