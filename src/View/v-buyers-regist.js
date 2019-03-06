import SuperView, { inheritPrototype } from './Base/SuperView'
import BuyersRegistChart from './Chart/c-buyers-regist'
import BuyersRegistSelector from './Selector/sel-buyers-regist'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '注册买家数' })
  this.chart = new BuyersRegistChart({ chartContainerId: this.chartWrapperId })
  this.selector = new BuyersRegistSelector({
    chartContainerId: this.selectorWrapperId,
  })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({data}) {
    this.chart.render(data)
  },
}

export default View
