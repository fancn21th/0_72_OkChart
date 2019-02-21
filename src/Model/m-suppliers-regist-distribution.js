import events from '../Utils/events'
import queryConvert from '../Converter/Query/c-q-suppliers-regist-distribution'

const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(selectorData) {
        const params = queryConvert(selectorData)
        this.query.query(params).then(response => {
            events.notify('suppliers-regist-distribution', {
                key: 'suppliers-regist-distribution',
                data: {
                    distribution: {
                        collection: response.rows,
                    },
                },
            })
        })
    },
}
export default Model