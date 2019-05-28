import SuperView, { inheritPrototype } from './Base/SuperView'
import Chart from '../View/Chart/c-name2change' // TODO: change Chart path
import Selector from '../View/Selector/c-name2change' // TODO: change Selector path

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: 'Title to change' }) // TODO: change view title
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
    { data2Deconstruct } // TODO: change render parameter
  ) {
    this.chart.render(data2Deconstruct) // TODO: change render parameter
  },
}

export default View
