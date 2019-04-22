import { createTable } from '../../Utils/HtmlElementBuilder'

const Chart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.table = null
}

const titles = ['年月', '注册买家数', '注册卖家数', '注册用户总数']

Chart.prototype = {
  // initialization
  init: function() {
    this.table = createTable({
      titles,
      data: [],
      className: 'overview',
    })
    this.chartContainer.appendChild(this.table)
  },
  // render
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

export default Chart
