import { Chart } from '@antv/g2'

// function 1: constructor
const DistributionChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

DistributionChart.prototype = {
  // function 2: initialization
  init: function() {
    this.chart = new G2.Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 350,
      padding: 10,
    })
  },
  // function 3: render
  render: function(data) {
    this.chart.source(data)
    this.chart.scale('value', {
      alias: '用户访问增长',
    })
    this.chart.axis('item', {
      label: {
        textStyle: {
          fill: '#333',
        },
      },
      tickLine: {
        alignWithLabel: false,
        length: 0,
      },
    })

    this.chart.axis('value', {
      title: {
        offset: 0,
      },
    })
    this.chart.legend(false)
    this.chart
      .interval()
      .position('item*value')
      .opacity(1)
      .color('value', function(val) {
        if (val < 0) {
          return '#ff5957'
        }
        return '#36c361'
      })
      .label('item*value', function(item, value) {
        var offset = 15
        if (value < 0) {
          offset *= -1
        }
        return {
          useHtml: true,
          htmlTemplate: function htmlTemplate(text, item) {
            var d = item.point
            return '<span class="g2-label">' + d.value + '</span>'
          },
          offset: offset,
        }
      })

    this.chart.render()
  },
}

export default DistributionChart
