import OverviewModel from '../Model/m-overview'
import PvUvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'
import UserGrowthModel from '../Model/m-user-growth'
import BuyersRegistGrowthModel from '../Model/m-buyers-regist-growth'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributiontModel from '../Model/m-buyers-regist-distribution'
import TopBrowserModel from '../Model/m-top-browser'
import BrowserGrowthModel from '../Model/m-browser-growth'
import SuppliersRegistModel from '../Model/m-suppliers-regist'
import SuppliersRegistDistributiontModel from '../Model/m-suppliers-regist-distribution'
import SuppliersRegistGrowthModel from '../Model/m-suppliers-regist-growth'

const buildModel = ({ type, query }) => {
  switch (type) {
    case 'overview':
      return new OverviewModel(query)
    case 'pv-uv':
      return new PvUvModel(query)
    case 'distribution':
      return [new DistributionModel(query), new UserGrowthModel(query)]
    case 'top-browser':
      return [new TopBrowserModel(query), new BrowserGrowthModel(query)]
    case 'buyers-regist':
      return new BuyersRegistModel(query)
    case 'buyers-regist-distribution':
      return [
        new BuyersRegistDistributiontModel(query),
        new BuyersRegistGrowthModel(query),
      ]
    case 'suppliers-regist':
      return new SuppliersRegistModel(query)
    case 'suppliers-regist-distribution':
      return [
        new SuppliersRegistDistributiontModel(query),
        new SuppliersRegistGrowthModel(query),
      ]
    default:
      return null
  }
}

export default buildModel
