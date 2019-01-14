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
    this.chartContainer.innerHTML = data
  }
}

export default View
