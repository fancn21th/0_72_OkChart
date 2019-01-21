import events from '../Utils/events'
import convert from '../DataConverter/dc-pv-uv'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(params) {
    this.query.query(params).then(response => {
      console.log(response)
      events.notify('pv-uv', {
        key: 'pv-uv',
        data: convert(response.rows),
      })
    })
  },
}

export default Model
