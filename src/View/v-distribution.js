import DistributionChart from '../View/Chart/c-distribution'
import DistributionSelector from '../View/Selector/sel-distribution'

const View = function({ type, chartContainerId }) {
  this.type = type // TODO: used outwards
  this.chart = new DistributionChart({
    chartContainerId: ['distribution-container', 'user-growth-container'],
  })
  this.selector = new DistributionSelector({ chartContainerId })
}

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
