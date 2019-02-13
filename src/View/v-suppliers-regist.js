import SuperView, { inheritPrototype } from './Base/SuperView'
import SuppliersRegistChart from './Chart/c-suppliers-regist'
import SuppliersRegistSelector from './Selector/sel-suppliers-regist'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '注册卖家数' })
  this.chart = new SuppliersRegistChart({
    chartContainerId: this.chartWrapperId,
  })
  this.selector = new SuppliersRegistSelector({
    chartContainerId: this.selectorWrapperId,
  })
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
