import events from '../Utils/events'
import dataConverterQuery from '../DataConverter/Query/dc-q-pv-uv'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models
}

Presenter.prototype = {
  init: function() {
    const self = this
    // hook up to pv-uv model update
    events.attach('pv-uv', function(data) {
      self.refresh(data)
    })
    // initialize all view elements
    this.view.chart.init()
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
  },

  refresh: function(data) {
    this.view.render(data)
  },
}

export default Presenter
