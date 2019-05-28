// TODO: finish the selector
import SuperSelector, { inheritPrototype } from './Base/SuperSelector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import TimeUnitSelector from './Control/time-unit-selector'
import OkCustomerTypeSelector from './Control/ok-customer-type-selector'
import AccumulativeSelector from './Control/accumulative-selector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })
  this.selectorList = this.selectorList.concat([
    new TimespanSelector(),
    new DateRangeSelector(),
    new OkCustomerTypeSelector(),
    new TimeUnitSelector(),
    new AccumulativeSelector(),
  ])
}

inheritPrototype(Selector, SuperSelector)

Selector.prototype.render = function() {}

export default Selector
