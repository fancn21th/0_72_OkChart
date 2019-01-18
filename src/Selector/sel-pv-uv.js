import Selector from './Base/Selector'
import TimespanSelector from './Control/timespan-selector'
import DateRangeSelector from './Control/date-range-selector'
import TimeUnitSelector from './Control/time-unit-selector'

const SelectorPvUv = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.selector = new Selector({
    chartContainerId,
    selectorList: [
      new TimespanSelector(),
      new DateRangeSelector(),
      new TimeUnitSelector(),
    ],
  })
}

SelectorPvUv.prototype = {
  init: function({ onChange }) {
    let query = {}
    const onChangeHandler = data => {
      query = Object.assign(query, data)
      onChange(query)
    }
    this.selector.init({
      onChange: onChangeHandler,
    })
  },
}

export default SelectorPvUv
