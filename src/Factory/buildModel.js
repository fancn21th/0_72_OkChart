import PvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'
import UserGrowthModel from '../Model/m-user-growth'
import BuyersRegistGrowthModel from '../Model/m-buyers-regist-growth'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributiontModel from '../Model/m-buyers-regist-distribution'

const buildModel = ({ type, query }) => {
    switch (type) {
        case 'pv-uv':
            return new PvModel(query)
        case 'distribution':
            return [new DistributionModel(query), new UserGrowthModel(query)]
        case 'buyers-regist':
            return new BuyersRegistModel(query)
        case 'buyers-regist-distribution':
            return [new BuyersRegistDistributiontModel(query), new BuyersRegistGrowthModel(query)]
        default:
            return null
    }
}

export default buildModel