const GoogleApiAuthenticator = function ({
  gapi,
  containerId,
  clientId
}) {
  this.gapi = gapi
  this.containerId = containerId
  this.clientId = clientId
}

GoogleApiAuthenticator.prototype = {
  init: function () {
    this.gapi.analytics.auth.authorize({
      container: this.containerId,
      clientid: this.clientId
    });
  }
};

export default GoogleApiAuthenticator
