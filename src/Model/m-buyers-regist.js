import events from '../Utils/events'
import convert from '../Converter/Data/c-d-buyers-regist'

const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(params) {
        this.query.query(params).then(response => {
            const data = convert(response.rows)
                // TODO: debugger console
            console.log(response)
            events.notify('buyers-regist', {
                key: 'buyers-regist',
                data,
            })
        })
    },
}
export default Model