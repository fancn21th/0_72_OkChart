import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import PvuvPuSelector from './Control/pvuv-pu-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    new PvuvPuSelector(),
    new WorkingDateSelector(),
  ]
}

Selector.prototype = {
  init: function({ onSelectorChange }) {
    let query = {}
    const onChangeHandler = data => {
      query = Object.assign(query, data)
      onSelectorChange(query)
    }
    this.selectorList.forEach(selector => {
      selector.init({ onSelectorChange: onChangeHandler })
      selector.appendTo(this.chartContainer)
    })
  },
}

export default Selector
