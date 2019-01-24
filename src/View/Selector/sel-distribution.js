import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import TimeUnitSelector from './Control/time-unit-selector'
import PvuvSelector from './Control/pvuv-selector'
import CountryBrowserSelector from './Control/country-browser-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    new TimeUnitSelector(),
    new PvuvSelector(),
    new CountryBrowserSelector(),
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
      selector.appendTo(this.chartContainer.parentNode)
    })
  },
}

export default Selector
