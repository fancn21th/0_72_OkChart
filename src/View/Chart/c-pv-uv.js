import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

// function 1: constructor
const PvUvChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

PvUvChart.prototype = {
  // function 2: initialization
  init: function() {
    this.chart = new Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400,
    })
  },
  // function 3: render
  render: function(data) {
    this.chart.clear()
    var ds = new DataSet()
    var dv = ds.createView().source(data)
    // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
    dv.transform({
      type: 'fold',
      fields: ['PV', 'UV'], // 展开字段集
      key: 'PVUV', // key字段
      value: 'count', // value字段
    })
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
      .position('timeUnit*count')
      .color('PVUV')
      .shape('line')
    this.chart
      .point()
      .position('timeUnit*count')
      .color('PVUV')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      })
    this.chart.render()
  },
}

export default PvUvChart
