import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.sourceSelector = new DynamicMultipleSelector({
    selectorType: 'source',
    placeholder: '选择或者输入来源过滤项',
  })
  this.countrySelector = new DynamicMultipleSelector({
    selectorType: 'country',
    placeholder: '选择或者输入国家过滤项',
  })
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    this.sourceSelector,
    this.countrySelector,
    new WorkingDateSelector(),
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
