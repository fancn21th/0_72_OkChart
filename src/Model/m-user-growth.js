import events from '../Utils/events'
import userGrowthDataConvert from '../Converter/Data/c-d-user-growth'
import userGrowthQueryConvert from '../Converter/Query/c-q-user-growth'
import distributionDataConvert from '../Converter/Data/c-d-distribution'
import distributionQueryConvert from '../Converter/Query/c-q-distribution'
import { resolve } from 'path'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params1 = distributionQueryConvert(selectorData)
    const params2 = userGrowthQueryConvert(selectorData)
    const timeSpanSelector = Object.assign({ timespan: 30 }, selectorData)
    const self = this
    let distribution = null
    self.query
      .query(params1)
      .then(response => {
        distribution = distributionDataConvert(response.rows, timeSpanSelector)
        return self.query.query(params2)
      })
      .then(response => {
        const userGrowth = userGrowthDataConvert(
          response.rows,
          distribution,
          timeSpanSelector
        )
        events.notify('distribution', {
          key: 'distribution',
          data: { data2: userGrowth },
        })
      })
  },
}

export default Model
