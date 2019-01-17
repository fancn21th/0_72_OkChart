const View = function ({
  chart,
  authenticator,
  viewSelector,
  chartSelector,
}) {
  this.chart = chart
  this.authenticator = authenticator
  this.viewSelector = viewSelector
  this.chartSelector = chartSelector
};

View.prototype = {
  render: function (data) {
    this.chart.render(data)
  }
}

export default View
