import './charts/types/chart-type'
import './charts/okchart'

// orchestration
(function (win, doc) {
  // Load the Embed API library once
  (function (w, d, s, g, js, fs) {
    g = w.gapi || (w.gapi = {});
    g.analytics = {
      q: [],
      ready: function (f) {
        this.q.push(f);
      }
    };
    js = d.createElement(s);
    fs = d.getElementsByTagName(s)[0];
    js.src = 'https://apis.google.com/js/platform.js';
    fs.parentNode.insertBefore(js, fs);
    js.onload = function () {
      g.load('analytics');
    };
  }(win, doc, 'script'));

})(window, document);