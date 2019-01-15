const GoogleApiViewSelector = function({ gapi, containerId }) {
  this.gapi = gapi
  this.containerId = containerId
}

GoogleApiViewSelector.prototype = {
  init: function({ onChange }) {
    const selector = new this.gapi.analytics.ViewSelector({
      container: this.containerId,
    })

    selector.execute()

    selector.on('change', onChange)
  },
}

export default GoogleApiViewSelector
