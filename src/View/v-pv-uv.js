const View = function ({
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
    console.log(data)
    this.chart.render(data)
  }
}

export default View
