const Presenter = function (model, view) {
  this.model = model;
  this.view = view;
};

Presenter.prototype = {
  init: function () {
    const self = this;
    // hook up to the observer object
    this.model.pv_uv.attach(function (data) {
      self.refresh(data);
    });

    this.view.chart.init()
    this.view.authenticator.init()
    this.view.viewSelector.init(ids => {
      this.model.getPvUv({
        'ids': ids,
        metrics: 'ga:pageviews,ga:uniquePageviews',
        dimensions: 'ga:date',
        'start-date': '30daysAgo',
        'end-date': 'yesterday'
      });
    })
  },

  refresh: function (data) {
    this.view.render(data)
  }
};

export default Presenter
