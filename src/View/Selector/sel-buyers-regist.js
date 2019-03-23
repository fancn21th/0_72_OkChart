import SuperSelector, { inheritPrototype } from './Base/SuperSelector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import TimeUnitSelector from './Control/time-unit-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })

  this.selectorList = this.selectorList.concat([
    new TimespanSelector(),
    new DateRangeSelector(),
    new TimeUnitSelector(),
    new WorkingDateSelector(),
  ])
}

inheritPrototype(Selector, SuperSelector)

export default Selector
