import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-pv-uv'
import queryConvert from '../Converter/Query/c-q-pv-uv'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    this.query.query(params).then(response => {
      const data = dataConvert(response.rows)
      // TODO: debugger console
      console.log(response)
      events.notify('pv-uv', {
        key: 'pv-uv',
        data,
      })
    })
  },
}

export default Model
