import { createDate } from '../../Utils/HtmlElementBuilder'

const DateRangeSelector = function() {
  this.startDate = createDate()
  this.endDate = createDate()
}

DateRangeSelector.prototype = {
  init: function({ onChange }) {},
  appendTo: function(parentNode) {
    parentNode.appendChild(this.startDate)
    parentNode.appendChild(this.endDate)
  },
}

export default DateRangeSelector
