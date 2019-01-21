import PvUvChart from '../View/Chart/c-pv-uv'
import PvUvSelector from '../View/Selector/sel-pv-uv'

const View = function({ chartContainerId }) {
  this.chart = new PvUvChart({ chartContainerId })
  this.selector = new PvUvSelector({ chartContainerId })
}

View.prototype = {
  init: function() {
    this.chart.init()
    this.selector.init()
  },
  render: function(data) {
    this.chart.render(data)
  },
}

export default View
