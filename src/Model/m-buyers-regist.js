import events from '../Utils/events'
import convert from '../Converter/Data/c-d-buyers-regist'
import queryConvert from '../Converter/Query/c-q-buyers-regist'
const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(selectorData) {
        const params = queryConvert(selectorData)
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