import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-source-top-15'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    const { timespan, startDate, endDate } = selectorData
    this.query.query(params).then(response => {
      events.notify('source-top-15', {
        key: 'source-top-15',
        data: {
          top15: {
            collection: response.rows,
            timespan,
            startDate,
            endDate,
          },
        },
      })
    })
  },
}

export default Model
