import events from '../Utils/events'
import convert from '../Converter/Data/c-d-pv-uv'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(params) {
    this.query.query(params).then(response => {
      const data = convert(response.rows)
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
