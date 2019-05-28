import SuperView, { inheritPrototype } from './Base/SuperView'
import Chart from '../View/Chart/c-ok-customer-overview'
import Selector from '../View/Selector/sel-ok-customer-overview'

const View = function({ chartContainerId }) {
  SuperView.call(this, {
    chartContainerId,
    title: 'OKCHEM.COM 客户概况',
  })
  this.chart = new Chart({ chartContainerId: this.chartWrapperId })
  this.selector = new Selector({ chartContainerId: this.selectorWrapperId })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function(
    { data } // TODO: change render parameter
  ) {
    this.chart.render({ data }) // TODO: change render parameter
  },
}

export default View
