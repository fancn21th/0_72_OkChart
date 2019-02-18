import events from '../Utils/events'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models
  // cache selector data for each view by default
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
    Object.keys(self.views).forEach(viewType => {
      const view = self.views[viewType]
      // default selector data for each view's selector
      self.selectorData[viewType] = {
        ids: self.ids,
      }
      view.init({
        onSelectorChange: data => {
          // new selector data against old one
          const selectorData = {
            ...self.selectorData[viewType], // override old selector data
            ids: self.ids,
            ...data,
          }
          const model = self.models[viewType]
          // TODO: for now model could be single model entity or a model array
          if (Array.isArray(model)) {
            model.forEach(item => {
              item.fetch(selectorData)
            })
          } else {
            model.fetch(selectorData)
          }
          // update old selector data
          self.selectorData[viewType] = selectorData
        },
      })
    })
  },
  refresh: function({ key: viewType, data }) {
    if (viewType) {
      this.views[viewType].render(data)
    }
  },
  reload: function() {
    Object.keys(this.models).forEach(key => {
      const selectorData = {
        ...this.selectorData[key],
        ids: this.ids,
      }
      const model = this.models[key]
      if (Array.isArray(model)) {
        model.forEach(item => {
          item.fetch(selectorData)
        })
      } else {
        model.fetch(selectorData)
      }
    })
  },
}

export default Presenter
