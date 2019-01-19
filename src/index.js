import OkChart from './OkChart'
import './assets/css/main.css'

;
(function (win, doc) {
  const loadGoogleApi = (function (w, d, s, g, js, fs) {
    g = w.gapi || (w.gapi = {})
    g.analytics = {
      q: [],
      ready: function (f) {
        this.q.push(f)
      },
    }
    js = d.createElement(s)
    fs = d.getElementsByTagName(s)[0]
    js.src = 'https://apis.google.com/js/platform.js'
    fs.parentNode.insertBefore(js, fs)
    js.onload = function () {
      g.load('analytics')
    }
  }).bind(null, win, doc, 'script')
  win.okchart = new OkChart({
    willMount: loadGoogleApi
  })
})(window, document)
