import {
  createUnorderedList,
  createUnorderedListItem,
  createSpan,
  createDiv2,
} from '../../Utils/HtmlElementBuilder'

// function 1: constructor
const PvUvChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.pvSpan = createSpan({ text: '0' })
  this.uvSpan = createSpan({ text: '0' })
  this.buyerCountSpan = createSpan({ text: '0' })
  this.supplierCountSpan = createSpan({ text: '0' })
}

PvUvChart.prototype = {
  // function 2: initialization
  init: function() {
    const pvTitleSpan = createSpan({ text: 'PV' })
    const uvTitleSpan = createSpan({ text: 'UV' })
    const buyerCountTitleSpan = createSpan({ text: '注册买家数' })
    const supplierCountTitleSpan = createSpan({ text: '注册卖家数' })
    const content = createUnorderedList({
      children: [
        createUnorderedListItem({
          children: [pvTitleSpan, this.pvSpan],
        }),
        createUnorderedListItem({
          children: [uvTitleSpan, this.uvSpan],
        }),
        createUnorderedListItem({
          children: [buyerCountTitleSpan, this.buyerCountSpan],
        }),
        createUnorderedListItem({
          children: [supplierCountTitleSpan, this.supplierCountSpan],
        }),
      ],
    })
    this.chartContainer.appendChild(content)
  },
  // function 3: render
  render: function(data) {
    this.pvSpan.innerHTML = '1'
    this.uvSpan.innerHTML = '1'
    this.buyerCountSpan.innerHTML = '1'
    this.supplierCountSpan.innerHTML = '1'
  },
}

export default PvUvChart
