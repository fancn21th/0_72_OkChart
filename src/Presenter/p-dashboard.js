import events from '../Utils/events'
import queryConverter from '../Utils/queryConverter'

const Presenter = function({ views, models, queryConverterConfigs }) {
  this.views = views
  this.models = models
  this.queryConverterConfigs = queryConverterConfigs
  // cache selector data for each view by default
  this.selectorData = {}
  this.ids = null
}

Presenter.prototype = {
  cacheSelectorData: function({ viewType, selectorData }) {
    this.selectorData[viewType] = selectorData
  },
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
          // TODO: debugger
          console.log('debugger:: selector data ', data)
          // merge current selector data with new selector data
          const selectorData = {
            ...self.selectorData[viewType], // override old selector data
            ids: self.ids,
            ...data,
          }
          // TODO: return selectorData if no config provided
          const queryData = queryConverter({
            config: self.queryConverterConfigs[viewType],
            selectorData,
          })
          // TODO: debugger
          console.log('debugger:: query data ', queryData)
          // update model based on new selector data
          const model = self.models[viewType]
          // TODO: for now model could be single model entity or an array of model entities
          if (Array.isArray(model)) {
            model.forEach(item => {
              item.fetch(queryData)
            })
          } else {
            model.fetch(queryData)
          }
          // cache new selector data
          self.cacheSelectorData({
            viewType,
            selectorData,
          })
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
      // TODO: debugger
      console.log('debugger:: selector data ', selectorData)
      // TODO: return selectorData if no config provided
      const queryData = queryConverter({
        config: this.queryConverterConfigs[key],
        selectorData,
      })
      // TODO: debugger
      console.log('debugger:: query data ', queryData)
      const model = this.models[key]
      if (Array.isArray(model)) {
        model.forEach(item => {
          item.fetch(queryData)
        })
      } else {
        model.fetch(queryData)
      }
    })
  },
}

export default Presenter
