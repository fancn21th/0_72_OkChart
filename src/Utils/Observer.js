const Observer = function() {
  this.observers = {}
}

Observer.prototype = {
  attach: function(eventName, callback) {
    if (!this.observers[eventName]) {
      this.observers[eventName] = []
    }
    this.observers[eventName].push(callback)
    return this.observers[eventName].indexOf(callback)
  },

  dettach: function(eventName, index) {
    const observer = this.observers[eventName]
    observer.splice(index, 1)
  },

  notify: function(eventName, data) {
    const observer = this.observers[eventName]
    observer.forEach(callback => callback(data))
  },
}

export default Observer
