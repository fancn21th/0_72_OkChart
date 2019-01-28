import events from '../Utils/events'
import browserGrowthDataConvert from '../Converter/Data/c-d-browser-growth'
import borwserGrowthQueryConvert from '../Converter/Query/c-q-browser-growth'
import topBrowserDataConvert from '../Converter/Data/c-d-top-browser'
import topBrowserQueryConvert from '../Converter/Query/c-q-top-browser'

const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params1 = topBrowserQueryConvert(selectorData)
    const params2 = borwserGrowthQueryConvert(selectorData)
    const self = this
    let distribution = null
    self.query
      .query(params1)
      .then(response => {
        distribution = topBrowserDataConvert(response.rows)
        return self.query.query(params2)
      })
      .then(response => {
        const userGrowth = browserGrowthDataConvert(response.rows, distribution)
        events.notify('top-browser', {
          key: 'top-browser',
          data: { data2: userGrowth },
        })
      })
  },
}

export default Model
