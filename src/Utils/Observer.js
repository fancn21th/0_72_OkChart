const Observer = function() {
  this.observers = {}
}

Observer.prototype = {
  attach: function(eventName, callback) {
    const observer = this.observers[eventName]
    if (!observer) this.observers[eventName] = []
    observer.push(callback)
    return observer.indexOf(callback)
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
