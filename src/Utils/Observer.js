const Observer = function () {
  this.observers = [];
};

Observer.prototype = {
  attach: function (callback) {
    this.observers.push(callback);
  },

  notify: function (n) {
    for (var i = 0, len = this.observers.length; i < len; i++) {
      this.observers[i](n);
    }
  }
};

export default Observer