import events from '../Utils/events'
import dataConverterQuery from '../DataConverter/Query/dc-q-pv-uv'
import buildQueryConverter from '../Factory/buildQueryConverter'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models
  this.ids = null
}

Presenter.prototype = {
  init: function() {
    const self = this
    // hook up to ids update
    events.attach('ids', ({ ids }) => {
      self.ids = ids
    })

    // hook up to model update
    Object.keys(self.models).forEach(key => {
      events.attach(key, function({ key, data }) {
        self.refresh({
          key,
          data,
        })
      })
    })

    Object.keys(self.views).forEach(key => {
      self.views[key].init({
        onSelectorChange: data => {
          const queryConverter = buildQueryConverter({
            type: key,
          })
          self.views[key].fetch(
            queryConverter({
              ids: self.ids,
              ...data,
            })
          )
        },
      })
    })
  },
  refresh: function({ key, data }) {
    this.views[key].render(data)
  },
}

export default Presenter
