import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-overview'
import queryConvert from '../Converter/Query/c-q-overview'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    this.query.query(params).then(response => {
      const data = dataConvert(response.rows)
      // TODO: console
      console.log(data)
      events.notify('overview', {
        key: 'overview',
        data,
      })
    })
  },
}

export default Model
