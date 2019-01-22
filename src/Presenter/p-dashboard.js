import events from '../Utils/events'
import buildQueryConverter from '../Factory/buildQueryConverter'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models
  this.selectorData = {}
  this.ids = null
}

Presenter.prototype = {
  init: function() {
    const self = this

    // hook up to ids update
    events.attach('ids', ({ ids }) => {
      self.ids = ids
      this.reload()
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

    // hook up to change event of view's selector
    self.views.forEach(view => {
      const { type: viewType } = view
      // default selector data for each view's selector
      self.selectorData[viewType] = {
        ids: self.ids,
      }
      view.init({
        onSelectorChange: data => {
          const queryConverter = buildQueryConverter({
            type: viewType,
          })
          // new selector data against old one
          const selectorData = {
            ...self.selectorData[viewType], // override old selector data
            ids: self.ids,
            ...data,
          }
          // update old selector data
          self.selectorData[viewType] = selectorData
          self.models[viewType].fetch(
            queryConverter({
              ...selectorData,
            })
          )
        },
      })
    })
  },
  refresh: function({ key, data }) {
    if (key) {
      this.views.forEach(view => {
        if (key === view.type) {
          view.render(data)
        }
      })
    }
  },
  reload: function() {
    Object.keys(this.models).forEach(key => {
      const queryConverter = buildQueryConverter({
        type: key,
      })
      const selectorData = {
        ...this.selectorData[key],
      }
      this.models[key].fetch(
        queryConverter({
          ...selectorData,
          ids: this.ids,
        })
      )
    })
  },
}

export default Presenter
