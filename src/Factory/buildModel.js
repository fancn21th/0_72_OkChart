import OverviewModel from '../Model/m-overview2'
import PvUvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'
import UserGrowthModel from '../Model/m-user-growth'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributionModel from '../Model/m-buyers-regist-distribution'
import BuyersRegistDistributionDoubleTimespanModel from '../Model/m-buyers-regist-distribution-double-timespan'
import SourceTop15Model from '../Model/m-source-top-15'
import SourceTop15DoubleTimespan from '../Model/m-source-top-15-double-timespan'
import SuppliersRegistModel from '../Model/m-suppliers-regist'
import SuppliersRegistDistributiontModel from '../Model/m-suppliers-regist-distribution'
import SuppliersRegistDistributionDoubleTimespanModel from '../Model/m-suppliers-regist-distribution-double-timespan'

const buildModel = ({ type, query }) => {
  switch (type) {
    case 'overview':
      return new OverviewModel(query)
    case 'pv-uv':
      return new PvUvModel(query)
    case 'distribution':
      return [new DistributionModel(query), new UserGrowthModel(query)]
    case 'source-top-15':
      return [new SourceTop15Model(query), new SourceTop15DoubleTimespan(query)]
    case 'buyers-regist':
      return new BuyersRegistModel(query)
    case 'buyers-regist-distribution':
      return [
        new BuyersRegistDistributionModel(query),
        new BuyersRegistDistributionDoubleTimespanModel(query),
      ]
    case 'suppliers-regist':
      return new SuppliersRegistModel(query)
    case 'suppliers-regist-distribution':
      return [
        new SuppliersRegistDistributiontModel(query),
        new SuppliersRegistDistributionDoubleTimespanModel(query),
      ]
    default:
      return null
  }
}

export default buildModel
