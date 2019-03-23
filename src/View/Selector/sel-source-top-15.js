import SuperSelector, { inheritPrototype } from './Base/SuperSelector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import PvuvPuSelector from './Control/pvuv-pu-selector'
import WorkingDateSelector from './Control/working-date-selector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })

  this.selectorList = this.selectorList.concat([
    new TimespanSelector(),
    new DateRangeSelector(),
    new PvuvPuSelector(),
    new WorkingDateSelector(),
  ])
}

inheritPrototype(Selector, SuperSelector)

export default Selector
