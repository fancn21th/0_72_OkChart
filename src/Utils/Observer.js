const Observer = function() {
  this.observersObj = {}
}

Observer.prototype = {
  attach: function(eventName, callback) {
    if (!(eventName in this.observersObj)) {
      this.observersObj[eventName] = []
    }
    this.observersObj[eventName].push(callback)
    return this.observersObj[eventName].indexOf(callback)
  },

  dettach: function(eventName, index) {
    const observer = this.observersObj[eventName]
    observer.splice(index, 1)
  },

  notify: function(eventName, data) {
    const observer = this.observersObj[eventName]
    observer.forEach(callback => callback(data))
  },
}

export default Observer
