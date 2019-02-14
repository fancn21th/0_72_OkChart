import events from '../Utils/events'
import convert from '../Converter/Data/c-d-suppliers-regist'
import queryConvert from '../Converter/Query/c-q-suppliers-regist'
const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    this.query.query(params).then(response => {
      const data = convert(response.rows)
      events.notify('suppliers-regist', {
        key: 'suppliers-regist',
        data,
      })
    })
  },
}
export default Model
