import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-overview'
import queryConvert from '../Converter/Query/c-q-overview'
import filter from '../Filter/Data/f-d-overview'

const Model = function(query) {
  this.query = query
  this.lastTimespan = null
  this.lastStartDate = null
  this.lastEndDate = null
  this.lastRows = null
}

Model.prototype = {
  fetch: function({ ids, timespan, startDate, endDate, source, country }) {
    // by default the selector data is cached in presenter
    if (
      timespan !== this.lastTimespan ||
      startDate !== this.lastStartDate ||
      endDate !== this.lastEndDate
    ) {
      // if any date among timespan, startDate and endDate is updated, re-fetch data from ga
      const params = queryConvert({ ids, timespan, startDate, endDate })
      this.query.query(params).then(response => {
        let data = dataConvert(response.rows)
        data.isUpdate = true
        events.notify('overview', {
          key: 'overview',
          data,
        })
        this.lastTimespan = timespan
        this.lastStartDate = startDate
        this.lastEndDate = endDate
        this.lastRows = response.rows
      })
    } else {
      // otherwise filter data from cache
      const filteredData = filter({
        collection: this.lastRows,
        source,
        country,
      })
      let data = dataConvert(filteredData)
      data.isUpdate = true
      events.notify('overview', {
        key: 'overview',
        data,
      })
    }
  },
}

export default Model
