import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-distribution'
import filter from '../Filter/Data/f-d-buyer-regist-distribution'

const Model = function(query) {
  this.query = query
  this.lastTimespan = null
  this.lastStartDate = null
  this.lastEndDate = null
  this.lastPvuv = null
  this.lastCountryBrowser = null
  this.lastCollection = null
}

Model.prototype = {
  isExpectingUpdate: function({
    timespan,
    startDate,
    endDate,
    pvuv,
    countryBrowser,
  }) {
    return (
      timespan !== this.lastTimespan ||
      startDate !== this.lastStartDate ||
      endDate !== this.lastEndDate ||
      countryBrowser !== this.lastCountryBrowser ||
      pvuv !== this.lastPvuv
    )
  },
  cacheQueryParams: function({
    timespan,
    startDate,
    endDate,
    pvuv,
    countryBrowser,
    collection,
  }) {
    this.lastTimespan = timespan
    this.lastStartDate = startDate
    this.lastEndDate = endDate
    this.lastPvuv = pvuv
    this.lastCountryBrowser = countryBrowser
    this.lastCollection = collection
  },
  fetch: function(selectorData) {
    const {
      timespan,
      startDate,
      endDate,
      pvuv,
      countryBrowser,
      sourceCountry,
    } = selectorData
    if (
      this.isExpectingUpdate({
        timespan,
        startDate,
        endDate,
        pvuv,
        countryBrowser,
      })
    ) {
      const params = queryConvert(selectorData)
      const {
        timespan,
        startDate,
        endDate,
        pvuv,
        countryBrowser,
      } = selectorData
      this.query.query(params).then(response => {
        const collection = response.rows
        events.notify('distribution', {
          key: 'distribution',
          data: {
            top15: {
              collection,
              isDataUpdate: true,
            },
          },
        })
        this.cacheQueryParams({
          timespan,
          startDate,
          endDate,
          pvuv,
          countryBrowser,
          collection,
        })
      })
    } else {
      const filteredData = filter({
        collection: this.lastCollection,
        sourceCountry,
      })
      events.notify('distribution', {
        key: 'distribution',
        data: {
          top15: {
            collection: filteredData,
            isDataUpdate: false,
          },
        },
      })
    }
  },
}

export default Model
