import SuperSelector, { inheritPrototype } from './Base/SuperSelector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import DynamicMultipleSelector from './Control/dynamic-multiple-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })

  this.sourceSelector = new DynamicMultipleSelector({
    selectorType: 'source',
    placeholder: '选择或者输入来源过滤项',
  })
  this.countrySelector = new DynamicMultipleSelector({
    selectorType: 'country',
    placeholder: '选择或者输入国家过滤项',
  })

  this.selectorList = this.selectorList.concat([
    new TimespanSelector(),
    new DateRangeSelector(),
    this.sourceSelector,
    this.countrySelector,
    new WorkingDateSelector(),
  ])
}

inheritPrototype(Selector, SuperSelector)

Selector.prototype.render = function({
  sourceFilterCollection,
  countryFilterCollection,
}) {
  this.sourceSelector.render({ options: sourceFilterCollection })
  this.countrySelector.render({ options: countryFilterCollection })
}

export default Selector
