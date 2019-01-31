import { Chart } from '@antv/g2'

// function 1: constructor
const DistributionChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

DistributionChart.prototype = {
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
    })

    this.chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">用户访问分布</div>',
      alignX: 'middle',
      alignY: 'middle',
    })

    this.chart
      .intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: function formatter(val, item) {
          return item.point.item + ': ' + item.point.count + ' , ' + val
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

export default DistributionChart
