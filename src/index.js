import GoogleApiQuery from './Utils/GoogleApiQuery'
import GoogleApiAuthenticator from './Utils/GoogleApiAuthenticator'
import GoogleApiViewSelector from './Utils/GoogleApiViewSelector'
import PvUvModel from './Model/m-pv-uv'
import PvUvView from './View/v-pv-uv'
import PvUvPresenter from './Presenter/p-pv-uv'
import PvUvChart from './Chart/c-pv-uv'

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

  gapi.analytics.ready(function () {
    // google api wrapper
    const googleApiQuery = new GoogleApiQuery(gapi);
    const googleApiAuthenticator = new GoogleApiAuthenticator({
      gapi,
      containerId: 'embed-api-auth-container',
      clientId: ''
    });
    const googleApiViewSelector = new GoogleApiViewSelector({
      gapi,
      containerId: 'view-selector-container',
    });
    // chart
    const pvUvChart = new PvUvChart({
      chartContainerId: 'chart-container'
    })
    // model
    const pvUvModel = new PvUvModel(googleApiQuery);
    // view
    const elements = {
      chart: pvUvChart,
      authenticator: googleApiAuthenticator,
      viewSelector: googleApiViewSelector
    }
    const pvUvView = new PvUvView(elements)
    // presenter
    const pvUvPresenter = new PvUvPresenter(pvUvModel, pvUvView)
    pvUvPresenter.init()
  });

})(window, document);
