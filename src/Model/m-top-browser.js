import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-top-browser'
import queryConvert from '../Converter/Query/c-q-top-browser'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    this.query.query(params).then(response => {
      const data = dataConvert(response.rows)
      // TODO: debugger console
      events.notify('top-browser', {
        key: 'top-browser',
        data: { data1: data },
      })
    })
  },
}

export default Model
