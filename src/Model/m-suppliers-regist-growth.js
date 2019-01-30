import events from '../Utils/events'
import convert from '../Converter/Data/c-d-suppliers-regist-growth'
import queryConvert from '../Converter/Query/c-q-suppliers-regist-growth'
import distributionQueryConvert from '../Converter/Query/c-q-suppliers-regist-distribution'
import distributionDataConvert from '../Converter/Data/c-d-distribution'

const Model = function(query) {
    this.query = query
}

Model.prototype = {
    fetch: function(selectorData) {
        const params1 = distributionQueryConvert(selectorData)
        const params2 = queryConvert(selectorData)
        const self = this;
        // 当前周期
        let distribution = null
        self.query
            .query(params1)
            .then(response => {
                distribution = distributionDataConvert(response.rows)
                return self.query.query(params2)
            })
            .then(response => {
                // 上一个周期
                const distributionGrowth = convert(response.rows, distribution)
                events.notify('suppliers-regist-distribution', {
                    key: 'suppliers-regist-distribution',
                    data: { data2: distributionGrowth },
                })
            })
    },
}
export default Model