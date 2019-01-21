const Selector = function({ chartContainerId, selectorList }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = selectorList
}

Selector.prototype = {
  init: function({ onChange }) {
    this.selectorList.forEach(selector => {
      selector.init({ onChange })
      selector.appendTo(this.chartContainer)
    })
  },
}

export default Selector
