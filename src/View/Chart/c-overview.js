import {
  createUnorderedList,
  createUnorderedListItem,
  createSpan,
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
  render: function({ pv, uv, buyerCount, supplierCount }) {
    this.pvSpan.innerHTML = pv
    this.uvSpan.innerHTML = uv
    this.buyerCountSpan.innerHTML = buyerCount
    this.supplierCountSpan.innerHTML = supplierCount
  },
}

export default PvUvChart
