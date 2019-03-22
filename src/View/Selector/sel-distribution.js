import SuperSelector, { inheritPrototype } from './Base/SuperSelector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import PvuvSelector from './Control/pvuv-selector'
import CountryBrowserSelector from './Control/country-browser-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })

  this.sourceCountrySelector = new DynamicMultipleSelector({
    selectorType: 'sourceCountry',
    placeholder: '选择或者输入渠道/国家过滤项',
  })

  this.selectorList = this.selectorList.concat([
    new TimespanSelector(),
    new DateRangeSelector(),
    new PvuvSelector(),
    new CountryBrowserSelector(),
    this.sourceCountrySelector,
    new WorkingDateSelector(),
  ])
}

inheritPrototype(Selector, SuperSelector)

Selector.prototype.render = function({ sourceCountryFilterCollection }) {
  this.sourceCountrySelector.render({
    options: sourceCountryFilterCollection,
  })
}

export default Selector
