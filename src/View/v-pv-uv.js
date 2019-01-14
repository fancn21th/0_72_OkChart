var View = function ({
  chart,
  authenticator,
  viewSelector,
}) {
  this.chart = chart;
  this.authenticator = authenticator;
  this.viewSelector = viewSelector;
};

View.prototype = {
  render: function (data) {
    this.chart.render(data)
  }
}

export default View
