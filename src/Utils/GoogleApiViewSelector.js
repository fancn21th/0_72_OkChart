const GoogleApiViewSelector = function ({
  gapi,
  containerId,
}) {
  this.gapi = gapi
  this.containerId = containerId
}

GoogleApiViewSelector.prototype = {
  init: function (containerId) {
    new this.gapi.analytics.ViewSelector({
        container: this.containerId,
      })
      .execute()
  }
};

export default GoogleApiViewSelector
