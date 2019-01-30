import PvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'
import UserGrowthModel from '../Model/m-user-growth'
import BuyersRegistGrowthModel from '../Model/m-buyers-regist-growth'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributiontModel from '../Model/m-buyers-regist-distribution'
import TopBrowserModel from '../Model/m-top-browser'
import browserGrowthModel from '../Model/m-browser-growth'
import SuppliersRegistModel from '../Model/m-suppliers-regist'
import SuppliersRegistDistributiontModel from '../Model/m-suppliers-regist-distribution'
import SuppliersRegistGrowthModel from '../Model/m-suppliers-regist-growth'

const buildModel = ({ type, query }) => {
<<<<<<< HEAD
    switch (type) {
        case 'pv-uv':
            return new PvModel(query)
        case 'distribution':
            return [new DistributionModel(query), new UserGrowthModel(query)]
        case 'top-browser':
            return [new TopBrowserModel(query), new browserGrowthModel(query)]
        case 'buyers-regist':
            return new BuyersRegistModel(query)
        case 'buyers-regist-distribution':
            return [new BuyersRegistDistributiontModel(query), new BuyersRegistGrowthModel(query)]
        case 'suppliers-regist':
            return new SuppliersRegistModel(query)
        case 'suppliers-regist-distribution':
            return [new SuppliersRegistDistributiontModel(query), new SuppliersRegistGrowthModel(query)]
        default:
            return null
    }
=======
  switch (type) {
    case 'pv-uv':
      return new PvModel(query)
    case 'distribution':
      return [new DistributionModel(query), new UserGrowthModel(query)]
    case 'top-browser':
      return [new TopBrowserModel(query), new browserGrowthModel(query)]
    case 'buyers-regist':
      return new BuyersRegistModel(query)
    case 'buyers-regist-distribution':
      return [
        new BuyersRegistDistributiontModel(query),
        new BuyersRegistGrowthModel(query),
      ]
    case 'suppliers-regist':
      return new SuppliersRegistModel(query)
    default:
      return null
  }
>>>>>>> 7bcfc1dd46f688566d7d85a45639a6dfca915933
}

export default buildModel
