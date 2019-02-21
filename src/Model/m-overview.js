import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-overview'
import workingDateFilter from '../Filter/Data/f-d-working-date'
import filter from '../Filter/Data/f-d-overview'

const Model = function(query) {
  this.query = query
  // by default the selector data is cached in presenter
  this.lastTimespan = null
  this.lastStartDate = null
  this.lastEndDate = null
  this.lastCollection = null
  this.lastNonWorkingDateCount = 0
}

Model.prototype = {
  isExpectingUpdate: function({ timespan, startDate, endDate, workingDate }) {
    return (
      timespan !== this.lastTimespan ||
      startDate !== this.lastStartDate ||
      endDate !== this.lastEndDate ||
      workingDate !== this.workingDate
    )
  },
  cacheQueryParams: function({
    timespan,
    startDate,
    endDate,
    collection,
    workingDate,
    nonWorkingDateCount,
  }) {
    this.lastTimespan = timespan
    this.lastStartDate = startDate
    this.lastEndDate = endDate
    this.lastCollection = collection
    this.lastWorkingDate = workingDate
    this.lastNonWorkingDateCount = nonWorkingDateCount
  },
  fetch: function({
    timespan,
    startDate,
    endDate,
    source,
    country,
    workingDate,
    queryParams,
  }) {
    if (this.isExpectingUpdate({ timespan, startDate, endDate, workingDate })) {
      // if any date among timespan, startDate and endDate is updated, re-fetch data from ga
      this.query.query(queryParams).then(response => {
        const collection = response.rows
        const filteredData = workingDateFilter({
          collection,
          workingDate,
        })
        const {
          collection: dateFilteredCollection,
          nonWorkingDateCount,
        } = filteredData
        let data = dataConvert({
          collection: dateFilteredCollection,
          timespan,
          startDate,
          endDate,
          workingDate,
          nonWorkingDateCount,
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
          collection: dateFilteredCollection,
          workingDate,
          nonWorkingDateCount,
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
        workingDate,
        nonWorkingDateCount: this.lastNonWorkingDateCount,
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
