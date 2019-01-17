const Selector = function ({
  chartContainerId,
  selectorList
}) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = selectorList
}

Selector.prototype = {
  init: function () {
    this.selectorList.forEach(selector => {
      selector.appendTo(this.chartContainer)
    })
  }
}

export default Selector
