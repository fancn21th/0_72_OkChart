import events from '../Utils/events'
import dataConverterQuery from '../Converter/Query/dc-q-pv-uv'
import buildQueryConverter from '../Factory/buildQueryConverter'

const Presenter = function({ views, models }) {
  this.views = views
  this.models = models
  this.queryParams = {}
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
    Object.keys(self.views).forEach(key => {
      // default params for each type
      self.queryParams[key] = {
        ids: self.ids,
      }
      self.views[key].init({
        onSelectorChange: data => {
          const queryConverter = buildQueryConverter({
            type: key,
          })
          // new param against old param
          const queryParam = {
            ...self.queryParams[key], // override old param
            ids: self.ids,
            ...data,
          }
          // update old param
          self.queryParams[key] = queryParam
          self.models[key].fetch(
            queryConverter({
              ...queryParam,
            })
          )
        },
      })
    })
  },
  refresh: function({ key, data }) {
    if (key && Object.keys(this.views).includes(key)) {
      this.views[key].render(data)
    }
  },
  reload: function() {
    Object.keys(this.models).forEach(key => {
      const queryConverter = buildQueryConverter({
        type: key,
      })
      const queryParam = {
        ...this.queryParams[key],
      }
      this.models[key].fetch(
        queryConverter({
          ...queryParam,
          ids: this.ids,
        })
      )
    })
  },
}

export default Presenter
