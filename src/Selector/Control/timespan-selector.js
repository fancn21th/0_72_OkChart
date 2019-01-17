const TimeSpanSelector = function () {
  this.selector = document.createElement('input')
}

TimeSpanSelector.prototype = {
  appendTo: function (parentNode) {
    parentNode.appendChild(this.selector)
  }
}

export default TimeSpanSelector
