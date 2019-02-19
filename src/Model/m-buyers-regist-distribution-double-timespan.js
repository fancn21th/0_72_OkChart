import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-buyers-regist-distribution'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert({
      ...selectorData,
      isDouble: true,
    })
    const { timespan, startDate, endDate, countryBrowser } = selectorData
    this.query.query(params).then(response => {
      events.notify('buyers-regist-distribution', {
        key: 'buyers-regist-distribution',
        data: {
          distributionDoubleTimespan: {
            collection: response.rows,
            timespan,
            startDate,
            endDate,
            countryBrowser,
          },
        },
      })
    })
  },
}
export default Model
