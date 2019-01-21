import { createDate } from '../../../Utils/HtmlElementBuilder'

const DateRangeSelector = function() {
  this.startDate = createDate()
  this.endDate = createDate()
}

DateRangeSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.startDate.onchange = function(e) {
      onSelectorChange({ startDate: e.target.value })
    }
    this.endDate.onchange = function(e) {
      onSelectorChange({ endDate: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.startDate)
    parentNode.appendChild(this.endDate)
  },
}

export default DateRangeSelector
