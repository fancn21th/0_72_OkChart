import events from '../Utils/events'
import convert from '../Converter/Data/c-d-buyers-regist-distribution'

const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(params) {
        this.query.query(params).then(response => {
            const data = convert(response.rows)
                // TODO: debugger console
            console.log(response)
            events.notify('buyers-regist-distribution', {
                key: 'buyers-regist-distribution',
                data,
            })
        })
    },
}
export default Model