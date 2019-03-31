import events from '../Utils/events'
import { queryDataPip } from '../Utils/pipeline/pip'
import { debuggger } from '../Utils/Debugger'
import {
  buildDefaultSelectorData,
  buildSelectorData,
} from '../Factory/buildSelectorData'

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
          const selectorDataArray = buildSelectorData({
            type: viewType,
            ids: self.ids,
            currentSelectorData: data,
          })
          self._processSelectorData({
            viewType,
            selectorDataArray,
          })
        },
      })
    })
  },
  _refresh: function({ key: viewType, data }) {
    if (viewType) {
      this.views[viewType].render(data)
    }
  },
  _initModels: function({ ids }) {
    Object.keys(this.models).forEach(key => {
      const selectorDataArray = buildDefaultSelectorData({
        type: key,
        ids,
      })
      this._processSelectorData({
        viewType: key,
        selectorDataArray,
      })
    })
  },
  _processSelectorData: function({ viewType, selectorDataArray }) {
    debuggger({
      type: viewType,
      title: 'selector data',
      data: selectorDataArray,
    })
    // convert selector data into query data
    const queryData = queryDataPip({
      selectorDataArray,
    })
    debuggger({
      type: viewType,
      title: 'query data',
      data: queryData,
    })
    // invoke update method of model
    const model = this.models[viewType]
    model.fetch(queryData)
  },
}

export default Presenter
