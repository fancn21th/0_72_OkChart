import events from '../Utils/events'
import dataConvert from '../Converter/Data/c-d-user-growth'
import queryConvert from '../Converter/Query/c-q-user-growth'

const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(selectorData) {
        const params = queryConvert(selectorData)
        this.query.query(params).then(response => {
            const data = dataConvert(response.rows)
                // TODO: debugger console
            events.notify('distribution', {
                key: 'distribution',
                data: { data2: data },
            })
        })
    },
}

export default Model