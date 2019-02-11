import events from '../Utils/events'
import convert from '../Converter/Data/c-d-suppliers-regist-distribution'
import queryConvert from '../Converter/Query/c-q-suppliers-regist-distribution'
const Model = function(query) {
  this.query = query
}

Model.prototype = {
  fetch: function(selectorData) {
    const params = queryConvert(selectorData)
    this.query.query(params).then(response => {
      const data = convert(response.rows)
      events.notify('suppliers-regist-distribution', {
        key: 'suppliers-regist-distribution',
        data: { data1: data },
      })
    })
  },
}
export default Model
