import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-distribution'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert({
      ...selectorData,
      isDouble: true,
    })
    const { timespan, startDate, endDate, pvuv, countryBrowser } = selectorData
    this.query.query(params).then(response => {
      events.notify('distribution', {
        key: 'distribution',
        data: {
          top15DoubleTimespan: {
            collection: response.rows,
            timespan,
            startDate,
            endDate,
            pvuv,
            countryBrowser,
          },
        },
      })
    })
  },
}

export default Model
