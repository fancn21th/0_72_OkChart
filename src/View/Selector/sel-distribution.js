import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import PvuvSelector from './Control/pvuv-selector'
import CountryBrowserSelector from './Control/country-browser-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function ({
  chartContainerId
}) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.sourceCountrySelector = new DynamicMultipleSelector({
    selectorType: 'sourceCountry',
    placeholder: '选择或者输入渠道/国家过滤项',
  })
  this.selectorList = [
    new TimespanSelector(),
    new DateRangeSelector(),
    new PvuvSelector(),
    new CountryBrowserSelector(),
    this.sourceCountrySelector,
    new WorkingDateSelector(),
  ]
}

Selector.prototype = {
  init: function ({
    onSelectorChange
  }) {
    let query = {}
    const onChangeHandler = data => {
      query = Object.assign(query, data)
      onSelectorChange(query)
    }
    this.selectorList.forEach(selector => {
      selector.init({
        onSelectorChange: onChangeHandler
      })
      selector.appendTo(this.chartContainer)
    })
  },
  render: function ({
    sourceCountryFilterCollection
  }) {
    this.sourceCountrySelector.render({
      options: sourceCountryFilterCollection,
    })
  },
}

export default Selector
