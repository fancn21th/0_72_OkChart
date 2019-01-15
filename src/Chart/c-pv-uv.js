import G2 from '@antv/g2';

// function 1: constructor
const PvUvChart = function ({
  chartContainerId
}) {
  this.chartContainerId = chartContainerId;
  this.chart = null;
};

PvUvChart.prototype = {
  // function 2: initilization
  init: function () {
    this.chart = new G2.Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400
    });
  },
  // function 3: render
  render: function (data) {
    this.chart.source(data);
    this.chart.scale('value', {
      min: 0
    });
    this.chart.scale('day', {
      range: [0, 1]
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart.line().position('day*value').shape('smooth');
    this.chart.point().position('day*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    // 如何格式化坐标轴文本
    // https://www.yuque.com/antv/g2-docs/tutorial-faq#vs5rwy
    this.chart.axis('day', {
      label: {
        formatter: val => {
          return `${val.slice(4, 6)}/${val.slice(6, 8)}`;
        }
      }
    });
    this.chart.render();
  }
}

export default PvUvChart
