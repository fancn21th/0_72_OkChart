import PvModel from '../Model/m-pv-uv'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributiontModel from '../Model/m-buyers-regist-distribution'

const buildModel = ({ type, query }) => {
    switch (type) {
        case 'pv-uv':
            return new PvModel(query)
        case 'buyers-regist':
            return new BuyersRegistModel(query)
        case 'buyers-regist-distribution':
            return new BuyersRegistDistributiontModel(query)
        default:
            return null
    }
}

export default buildModel