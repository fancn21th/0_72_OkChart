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
      padding: [100, 20, 30, 55], // 上右下左
    })
  },
  // function 3: render
  // {
  //   date: '2018/8/1',
  //   type: 'download',
  //   value: 4623,
  // }
  render: function(data) {
    var chart = this.chart
    chart.clear()
    chart.source(data)
    chart.tooltip({
      follow: false,
      crosshairs: 'y',
      htmlContent: function htmlContent(title, items) {
        var alias = {
          PV: '日均PV',
          UV: '日均UV',
          FPV: '日均免费PV',
          FUV: '日均免费UV',
        }
        var html = '<div class="custom-tooltip">'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var color = item.color
          var name = alias[item.name]
          var value = item.value
          var domHead =
            '<div class="custom-tooltip-item" style="border-left-color:' +
            color +
            '">'
          var domName =
            '<div class="custom-tooltip-item-name">' + name + '</div>'
          var domValue =
            '<div class="custom-tooltip-item-value">' + value + '</div>'
          var domTail = '</div>'
          html += domHead + domName + domValue + domTail
        }
        return html + '</div>'
      },
    })
    chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
    })
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
        formatter: function formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        },
      },
    })
    chart.legend(false)
    chart
      .line()
      .position('date*value')
      .color('type')
    chart.render()
    chart.showTooltip({
      x: $('#mountNode').width() - 20,
      y: 100,
    })
  },
}

export default PvUvChart
