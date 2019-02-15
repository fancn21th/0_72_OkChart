import {
  createUnorderedList,
  createUnorderedListItem,
  createSpan,
} from '../../Utils/HtmlElementBuilder'

// function 1: constructor
const PvUvChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.pvSpan = createSpan({
    text: '0',
    className: 'overview-container__content',
  })
  this.uvSpan = createSpan({
    text: '0',
    className: 'overview-container__content',
  })
  this.buyerCountSpan = createSpan({
    text: '0',
    className: 'overview-container__content',
  })
  this.supplierCountSpan = createSpan({
    text: '0',
    className: 'overview-container__content',
  })
}

PvUvChart.prototype = {
  // function 2: initialization
  init: function() {
    const pvTitleSpan = createSpan({
      text: 'PV（日均）',
      className: 'overview-container__title',
    })
    const uvTitleSpan = createSpan({
      text: 'UV（日均）',
      className: 'overview-container__title',
    })
    const buyerCountTitleSpan = createSpan({
      text: '注册买家数（总数）',
      className: 'overview-container__title',
    })
    const supplierCountTitleSpan = createSpan({
      text: '注册卖家数（总数）',
      className: 'overview-container__title',
    })
    const content = createUnorderedList({
      children: [
        createUnorderedListItem({
          children: [pvTitleSpan, this.pvSpan],
          className: 'overview-container__item',
        }),
        createUnorderedListItem({
          children: [uvTitleSpan, this.uvSpan],
          className: 'overview-container__item',
        }),
        createUnorderedListItem({
          children: [buyerCountTitleSpan, this.buyerCountSpan],
          className: 'overview-container__item',
        }),
        createUnorderedListItem({
          children: [supplierCountTitleSpan, this.supplierCountSpan],
          className: 'overview-container__item',
        }),
      ],
      className: 'overview-container',
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
