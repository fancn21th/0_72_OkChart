import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-overview'
import queryConvert from '../Converter/Query/c-q-overview'
import filter from '../Filter/Data/f-d-overview'

const Model = function(query) {
  this.query = query
  // by default the selector data is cached in presenter
  this.lastTimespan = null
  this.lastStartDate = null
  this.lastEndDate = null
  this.lastCollection = null
}

Model.prototype = {
  isExpectingUpdate: function({ timespan, startDate, endDate }) {
    return (
      timespan !== this.lastTimespan ||
      startDate !== this.lastStartDate ||
      endDate !== this.lastEndDate
    )
  },
  cacheQueryParams: function({ timespan, startDate, endDate, collection }) {
    this.lastTimespan = timespan
    this.lastStartDate = startDate
    this.lastEndDate = endDate
    this.lastRows = collection
  },
  fetch: function({ ids, timespan, startDate, endDate, source, country }) {
    if (this.isExpectingUpdate({ timespan, startDate, endDate })) {
      // if any date among timespan, startDate and endDate is updated, re-fetch data from ga
      const params = queryConvert({ ids, timespan, startDate, endDate })
      this.query.query(params).then(response => {
        const collection = response.rows
        let data = dataConvert({
          collection,
          timespan,
          startDate,
          endDate,
        })
        data.isDataUpdate = true
        events.notify('overview', {
          key: 'overview',
          data,
        })
        this.cacheQueryParams({
          timespan,
          startDate,
          endDate,
          collection,
        })
      })
    } else {
      // otherwise filter data from cache
      const filteredData = filter({
        collection: this.lastCollection,
        source,
        country,
      })
      let data = dataConvert({
        collection: filteredData,
        timespan,
        startDate,
        endDate,
      })
      data.isDataUpdate = false
      events.notify('overview', {
        key: 'overview',
        data,
      })
    }
  },
}

export default Model
