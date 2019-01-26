import events from '../Utils/events'
import convert from '../Converter/Data/c-d-buyers-regist-distribution'
import queryConvert from '../Converter/Query/c-q-buyers-regist-distribution'
const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(selectorData) {
        const params = queryConvert(selectorData)
        this.query.query(params).then(response => {
            const data = convert(response.rows)
                // TODO: debugger console
            events.notify('buyers-regist-distribution', {
                key: 'buyers-regist-distribution',
                data: { data1: data },
            })
        })
    },
}
export default Model