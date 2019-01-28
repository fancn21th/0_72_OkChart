import { Chart } from '@antv/g2'

// function 1: constructor
const BrowserGrowthChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

BrowserGrowthChart.prototype = {
  // function 2: initialization
  init: function() {
    this.chart = new G2.Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400,
      padding: 'auto',
    })
  },
  // function 3: render
  render: function(data) {
    this.chart.clear()
    this.chart.source(data)
    this.chart.scale('value', {
      alias: '该来源增长量',
    })
    this.chart.axis('item', {
      title: {
        text: '来源排名前15增长量',
        textStyle: {
          fontSize: 14,
          fill: '#333',
        },
      },
      // label: {
      //   textStyle: {
      //     fill: '#333',
      //   },
      // },
      tickLine: {
        alignWithLabel: false,
        length: 1,
      },
    })

    this.chart.axis('value', {
      title: {
        text: '增长量',
      },
      offset: 10,
      autoRotate: false,
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

export default BrowserGrowthChart
