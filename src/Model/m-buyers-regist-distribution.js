import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-buyers-regist-distribution'
import filter from '../Filter/Data/f-d-buyer-regist-distribution'

const Model = function(query) {
  this.query = query
  this.lastTimespan = null
  this.lastStartDate = null
  this.lastEndDate = null
  this.lastCountryBrowser = null
  this.lastCollection = null
}

Model.prototype = {
  isExpectingUpdate: function({
    timespan,
    startDate,
    endDate,
    countryBrowser,
  }) {
    return (
      timespan !== this.lastTimespan ||
      startDate !== this.lastStartDate ||
      endDate !== this.lastEndDate ||
      countryBrowser !== this.lastCountryBrowser
    )
  },
  cacheQueryParams: function({
    timespan,
    startDate,
    endDate,
    countryBrowser,
    collection,
  }) {
    this.lastTimespan = timespan
    this.lastStartDate = startDate
    this.lastEndDate = endDate
    this.lastCountryBrowser = countryBrowser
    this.lastCollection = collection
  },
  fetch: function(selectorData) {
    const {
      timespan,
      startDate,
      endDate,
      countryBrowser,
      sourceCountry,
    } = selectorData
    if (
      this.isExpectingUpdate({ timespan, startDate, endDate, countryBrowser })
    ) {
      const params = queryConvert(selectorData)
      this.query.query(params).then(response => {
        const collection = response.rows
        events.notify('buyers-regist-distribution', {
          key: 'buyers-regist-distribution',
          data: {
            distribution: {
              collection,
              isDataUpdate: true,
            },
          },
        })
        this.cacheQueryParams({
          timespan,
          startDate,
          endDate,
          countryBrowser,
          collection,
        })
      })
    } else {
      const filteredData = filter({
        collection: this.lastCollection,
        sourceCountry,
      })
      events.notify('buyers-regist-distribution', {
        key: 'buyers-regist-distribution',
        data: {
          distribution: {
            collection: filteredData,
            isDataUpdate: false,
          },
        },
      })
    }
  },
}
export default Model
