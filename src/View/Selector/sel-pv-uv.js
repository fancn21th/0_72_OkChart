import Selector from './Base/Selector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import TimeUnitSelector from './Control/time-unit-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    new TimeUnitSelector(),
  ]
}

Selector.prototype = {
  init: function({ onChange }) {
    let query = {}
    const onChangeHandler = data => {
      query = Object.assign(query, data)
      onChange(query)
    }
    this.selectorList.forEach(selector => {
      selector.init({ onChangeHandler })
      selector.appendTo(this.chartContainer)
    })
  },
}

export default Selector