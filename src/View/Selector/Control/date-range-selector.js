import { createDate } from '../../../Utils/HtmlElementBuilder'

const DateRangeSelector = function() {
  this.startDate = createDate()
  this.endDate = createDate()
}

DateRangeSelector.prototype = {
  init: function({ onChange }) {
    this.startDate.onchange = function(e) {
      onChange({ startDate: e.target.value })
    }
    this.endDate.onchange = function(e) {
      onChange({ endDate: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.startDate)
    parentNode.appendChild(this.endDate)
  },
}

export default DateRangeSelector
