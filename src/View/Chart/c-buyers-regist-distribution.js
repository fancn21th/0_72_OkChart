import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

// function 1: constructor
const BuyersRegistChartDistribution = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

BuyersRegistChartDistribution.prototype = {
  // function 2: initialization
  init: function() {
    this.chart = new Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400,
      animate: false,
    })
  },
  // function 3: render
  render: function(data) {
    this.chart.clear()
    // 绘制饼图
    this.chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = (val * 100).toFixed(2) + '%'
          return val
        },
      },
    })
    this.chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    })
    this.chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    })
    // 辅助文本
    this.chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">注册买家分布</div>',
      alignX: 'middle',
      alignY: 'middle',
    })
    var interval = this.chart
      .intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: function formatter(val, item) {
          return item.point.item + ': ' + val
        },
      })
      .tooltip('item*percent', function(item, percent) {
        percent = (percent * 100).toFixed(2) + '%'
        return {
          name: item,
          value: percent,
        }
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })

    this.chart.render()
  },
}

export default BuyersRegistChartDistribution
