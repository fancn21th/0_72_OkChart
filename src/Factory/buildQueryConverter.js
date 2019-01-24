import convertPvUvQuery from '../Converter/Query/c-q-pv-uv'
import convertBuyersRegistQuery from '../Converter/Query/c-q-buyers-regist'
import convertBuyersRegistDistributionQuery from '../Converter/Query/c-q-buyers-regist-distribution'

const buildQueryConverter = ({ type }) => {
    switch (type) {
        case 'pv-uv':
            return convertPvUvQuery
        case 'buyers-regist':
            return convertBuyersRegistQuery
        case 'buyers-regist-distribution':
            return convertBuyersRegistDistributionQuery
        default:
            return null
    }
}

export default buildQueryConverter