import events from '../Utils/events'
import dataConverterQuery from '../DataConverter/Query/dc-q-pv-uv'

const Presenter = function({ view }) {
  this.view = view
  this.ids = null
}

Presenter.prototype = {
  init: function() {
    const self = this
    // hook up to pv-uv model update¬
    events.attach('pv-uv', function(data) {
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
