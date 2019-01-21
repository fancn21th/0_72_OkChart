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
    var ds = new DataSet()
    var dv = ds.createView().source(data)
    // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
    dv.transform({
      type: 'fold',
      fields: ['pv', 'uv'], // 展开字段集
      key: 'pvuv', // key字段
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
    // 如何格式化坐标轴文本
    // https://www.yuque.com/antv/g2-docs/tutorial-faq#vs5rwy
    // this.chart.axis('day', {
    //   label: {
    //     formatter: val => {
    //       return `${val.slice(4, 6)}/${val.slice(6, 8)}`
    //     },
    //   },
    // })
    this.chart
      .line()
      .position('day*count')
      .color('pvuv')
      .shape('line')
    this.chart
      .point()
      .position('day*count')
      .color('pvuv')
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
