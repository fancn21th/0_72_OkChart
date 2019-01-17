const TimeUnitSelector = function () {
  this.selector = document.createElement('input')
}

TimeUnitSelector.prototype = {
  appendTo: function (parentNode) {
    parentNode.appendChild(this.selector)
  }
}

export default TimeUnitSelector
