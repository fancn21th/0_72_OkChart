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
  init: function({ onSelectorChange }) {
    let query = {}
    const onChangeHandler = data => {
      query = Object.assign(query, data)
      onSelectorChange(query)
    }
    this.selectorList.forEach(selector => {
      selector.init({ onSelectorChange: onChangeHandler })
      const selectorContainer = this.chartContainer.getElementsByClassName(
        'selector-container'
      )[0]
      selector.appendTo(selectorContainer)
    })
  },
}

export default Selector
