import { createTable } from '../../Utils/HtmlElementBuilder'

const titles = [
  '渠道',
  'PV（日均）',
  'UV（日均）',
  '注册买家数（总数）',
  '注册卖家数（总数）',
]

// function 1: constructor
const PvUvChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.table = null
}

PvUvChart.prototype = {
  // function 2: initialization
  init: function() {
    this.table = createTable({
      titles,
      data: [],
      className: 'overview',
    })
    this.chartContainer.appendChild(this.table)
  },
  // function 3: render
  render: function({ data }) {
    this.chartContainer.removeChild(this.table)
    this.table = createTable({
      titles,
      data,
      className: 'overview',
    })
    this.chartContainer.appendChild(this.table)
  },
}

export default PvUvChart
