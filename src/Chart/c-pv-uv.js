import G2 from '@antv/g2';

const PvUvChart = function ({
  chartContainerId
}) {
  this.chartContainerId = chartContainerId;
  this.chart = null;
};

PvUvChart.prototype = {
  init: function () {
    this.chart = new G2.Chart({
      container: this.chartContainerId,
      forceFit: true,
      height: 400
    });
  },
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
    this.chart.line().position('day*value');
    this.chart.point().position('day*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.chart.render();
  }
}

export default PvUvChart
