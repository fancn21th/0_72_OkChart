import dataConverterQuery from '../DataConverter/Query/dc-q-pv-uv'

const Presenter = function(model, view) {
  this.model = model
  this.view = view
  this.ids = null
}

Presenter.prototype = {
  init: function() {
    const self = this
    // hook up to the observer object
    this.model.pv_uv.attach(function(data) {
      self.refresh(data)
    })
    // initialize all view elements
    this.view.chart.init()
    this.view.authenticator.init()
    this.view.chartSelector.init({
      onChange: data => {
        this.model.getPvUv(
          dataConverterQuery({
            ids: this.ids,
            ...data,
          })
        )
      },
    })
    this.view.viewSelector.init({
      onChange: ids => {
        this.ids = ids
        // default query
        this.model.getPvUv(
          dataConverterQuery({
            ids: this.ids,
          })
        )
      },
    })
  },

  refresh: function(data) {
    this.view.render(data)
  },
}

export default Presenter
