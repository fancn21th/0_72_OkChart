import events from '../Utils/events'
import { queryDataPip } from '../Utils/pipeline/pip'
import buildDefaultSelector from '../Factory/buildDefaultSelector'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models

  // cache selector data for each view by default
  this.cachedSelectorData = {}
  this.ids = null
}

Presenter.prototype = {
  init: function() {
    const self = this

    // hook up to ids update
    events.attach('ids', ({ ids }) => {
      self.ids = ids
      this._initModels({ ids })
    })

    // hook up to model update
    Object.keys(self.models).forEach(key => {
      events.attach(key, function({ key, data }) {
        self._refresh({
          key,
          data,
        })
      })
    })

    // hook up to change event of view's selector
    Object.keys(self.views).forEach(viewType => {
      const view = self.views[viewType]
      view.init({
        onSelectorChange: data => {
          // merge current selector data with new selector data
          const selectorData = {
            ...self.cachedSelectorData[viewType], // cached
            ids: self.ids, // ids
            ...data, // current
          }
          self._processSelectorData({
            viewType,
            selectorData,
          })
          // cache new selector data
          self._cacheSelectorData({
            viewType,
            selectorData,
          })
        },
      })
    })
  },
  _cacheSelectorData: function({ viewType, selectorData }) {
    this.cachedSelectorData[viewType] = selectorData
  },
  _refresh: function({ key: viewType, data }) {
    if (viewType) {
      this.views[viewType].render(data)
    }
  },
  _initModels: function({ ids }) {
    Object.keys(this.models).forEach(key => {
      const selectorData = {
        ...buildDefaultSelector({
          type: key,
        }),
        ids,
      }
      this._processSelectorData({
        viewType: key,
        selectorData,
      })
      // cache new selector data
      this._cacheSelectorData({
        viewType: key,
        selectorData,
      })
    })
  },
  _processSelectorData: function({ viewType, selectorData }) {
    // TODO: debugger
    console.log('debugger:: selector data ', selectorData)
    // convert selector data into query data
    const queryData = queryDataPip({
      viewType,
      selectorData,
    })
    // TODO: debugger
    console.log('debugger:: query data ', queryData)
    // invoke update method of model
    const model = this.models[viewType]
    if (Array.isArray(model)) {
      model.forEach(item => {
        item.fetch(queryData)
      })
    } else {
      model.fetch(queryData)
    }
  },
}

export default Presenter
