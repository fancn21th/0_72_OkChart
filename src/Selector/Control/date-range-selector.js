const DateRangeSelector = function () {
  this.selector = document.createElement('input')
}

DateRangeSelector.prototype = {
  appendTo: function (parentNode) {
    parentNode.appendChild(this.selector)
  }
}

export default DateRangeSelector
