import { Chart } from '@antv/g2'

// function 1: constructor
const TopBrowserChart = function({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chart = null
}

TopBrowserChart.prototype = {
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
    this.chart.source(data)

    this.chart.scale('count', {
      alias: '该来源数量',
    })

    this.chart.axis('item', {
      title: {
        text: '来源排名前15',
        textStyle: {
          fontSize: 14,
          fill: '#333',
        },
      },
      tickLine: {
        alignWithLabel: false,
        length: 1,
      },
    })

    this.chart.interval().position('item*count')
    this.chart.render()
  },
}

export default TopBrowserChart
