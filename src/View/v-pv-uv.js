var View = function ({
  chartContainer,
  authenticator,
  viewSelector,
}) {
  this.chartContainer = chartContainer;
  this.authenticator = authenticator;
  this.viewSelector = viewSelector;
};

View.prototype = {
  render: function (data) {
    console.log(data)
  }
}

export default View
