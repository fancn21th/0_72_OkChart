const SelectorMap = function() {
  this.map = {}
}

SelectorMap.prototype = {
  set: function(key, value) {
    // TODO: Bad Design
    const keyStr = JSON.stringify(key)
    this.map[keyStr] = value
  },
  has: function(key) {
    const keyStr = JSON.stringify(key)
    return keyStr in this.map
  },
  get: function(key) {
    const keyStr = JSON.stringify(key)
    return this.map[keyStr]
  },
}

export default SelectorMap
