import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import CountryBrowserSelector from './Control/country-browser-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.sourceCountrySelector = new DynamicMultipleSelector({
    selectorType: 'sourceCountry',
    placeholder: '选择或者输入来源过滤项',
  })
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    new CountryBrowserSelector(),
    this.sourceCountrySelector,
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
  render: function({ sourceCountry }) {
    this.sourceCountrySelector.render({ options: sourceCountry })
  },
}

export default Selector
