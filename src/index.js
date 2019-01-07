(function (win, doc) {
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

  const OKCHART = () => {
    const _init = ({
      clientid,
      authContainer,
      charts
    }) => {
      const {
        container,
        selector
      } = charts[0]

      gapi.analytics.ready(function () {

        /**
         * Authorize the user immediately if the user has already granted access.
         * If no access has been created, render an authorize button inside the
         * element with the ID "embed-api-auth-container".
         */
        gapi.analytics.auth.authorize({
          container: authContainer,
          clientid: clientid
        });


        /**
         * Create a new ViewSelector instance to be rendered inside of an
         * element with the id "view-selector-container".
         */
        var viewSelector = new gapi.analytics.ViewSelector({
          container: selector
        });

        // Render the view selector to the page.
        viewSelector.execute();


        /**
         * Create a new DataChart instance with the given query parameters
         * and Google chart options. It will be rendered inside an element
         * with the id "chart-container".
         */
        var dataChart = new gapi.analytics.googleCharts.DataChart({
          query: {
            metrics: 'ga:pageviews',
            dimensions: 'ga:date',
            'start-date': '30daysAgo',
            'end-date': 'yesterday'
          },
          chart: {
            container: container,
            type: 'LINE',
            options: {
              width: '100%'
            }
          }
        });


        /**
         * Render the dataChart on the page whenever a new view is selected.
         */
        viewSelector.on('change', function (ids) {
          dataChart.set({
            query: {
              ids: ids
            }
          }).execute();
        });

      });

    };

    return {
      init: _init
    };
  };
  win.okchart = OKCHART();
})(window, document);