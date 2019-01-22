const GoogleApiAuthenticator = function({ gapi, containerId, clientId }) {
  this.gapi = gapi
  this.containerId = containerId
  this.container = document.getElementById(this.containerId)
  this.clientId = clientId
}

GoogleApiAuthenticator.prototype = {
  init: function({ onSignIn, onSignOut }) {
    this.gapi.analytics.auth.authorize({
      container: this.containerId,
      clientid: this.clientId,
    })
    this.gapi.analytics.auth.on('signIn', onSignIn)
    this.gapi.analytics.auth.on('signOut', onSignOut)
  },
  hide: function() {
    this.container.style.display = 'none'
  },
  show: function() {
    this.container.style.display = 'block'
  },
}

export default GoogleApiAuthenticator
