import Selector from './Base/Selector'
import DataRangeSelector from './Control/date-range-selector'

const SelectorPvUv = function ({
  chartContainerId
}) {
  this.chartContainerId = chartContainerId
  this.selector = new Selector({
    chartContainerId,
    selectorList: [
      new DataRangeSelector()
    ]
  })
}

SelectorPvUv.prototype = {
  init: function () {
    this.selector.init()
  }
}

export default SelectorPvUv
