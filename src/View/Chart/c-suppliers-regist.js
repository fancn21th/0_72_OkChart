import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

// function 1: constructor
const BuyersRegistChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

BuyersRegistChart.prototype = {
  // function 2: initialization
  init: function() {
    this.chart = new Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400,
      padding: [40, 30, 60, 55], // 上右下左
    })
  },
  // function 3: render
  render: function(data) {
    this.chart.clear()
    var ds = new DataSet()
    var dv = ds.createView().source(data)
    // 绘制折线图
    this.chart.source(dv, {
      month: {
        range: [0, 1],
      },
    })
    this.chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    })
    this.chart
      .line()
      .position('day*suppliers')
      .color('#35B7FD')
      .shape('line')
    this.chart
      .point()
      .position('day*suppliers')
      .color('#35B7FD')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      })

    this.chart.render()
  },
}

export default BuyersRegistChart
