import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.sourceSelector = new DynamicMultipleSelector({
    selectorType: 'source',
  })
  this.countrySelector = new DynamicMultipleSelector({
    selectorType: 'country',
  })
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    this.sourceSelector,
    this.countrySelector,
  ]
}

Selector.prototype = {
  init: function({ onSelectorChange }) {
    let query = {}
    const onChangeHandler = data => {
      query = {
        ...query,
        ...data,
      }
      onSelectorChange(query)
    }
    this.selectorList.forEach(selector => {
      selector.init({ onSelectorChange: onChangeHandler })
      selector.appendTo(this.chartContainer)
    })
  },
  render: function({ source, country }) {
    this.sourceSelector.render({ options: source })
    this.countrySelector.render({ options: country })
  },
}

export default Selector
