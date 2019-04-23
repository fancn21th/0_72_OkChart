import SuperView, { inheritPrototype } from './Base/SuperView'
import Chart from '../View/Chart/c-ok-customer'
import Selector from '../View/Selector/sel-ok-customer'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: 'OKCHEM.COM 客户' })
  this.chart = new Chart({ chartContainerId: this.chartWrapperId })
  this.selector = new Selector({ chartContainerId: this.selectorWrapperId })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ data }) {
    this.chart.render(data)
  },
}

export default View
