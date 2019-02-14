import SuperView, { inheritPrototype } from './Base/SuperView'
import PvUvChart from './Chart/c-overview'
import PvUvSelector from './Selector/sel-overview'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '用户访问数' })
  this.chart = new PvUvChart({ chartContainerId: this.chartWrapperId })
  this.selector = new PvUvSelector({ chartContainerId: this.selectorWrapperId })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function(data) {
    this.chart.render(data)
  },
}

export default View
