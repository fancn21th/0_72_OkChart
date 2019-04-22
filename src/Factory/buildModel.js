import OverviewModel from '../Model/m-overview'
import PvUvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'
import BuyersRegistModel from '../Model/m-buyers-regist'
import BuyersRegistDistributionModel from '../Model/m-buyers-regist-distribution'
import SourceTop15Model from '../Model/m-source-top-15'
import SuppliersRegistModel from '../Model/m-suppliers-regist'
import SuppliersRegistDistributiontModel from '../Model/m-suppliers-regist-distribution'
import OkCustomerOverviewModel from '../Model/m-ok-customer-overview'

const buildModel = ({ type, query }) => {
  switch (type) {
    case 'ok-customer-overview':
      return new OkCustomerOverviewModel(query)
    case 'overview':
      return new OverviewModel(query)
    case 'pv-uv':
      return new PvUvModel(query)
    case 'distribution':
      return new DistributionModel(query)
    case 'source-top-15':
      return new SourceTop15Model(query)
    case 'buyers-regist':
      return new BuyersRegistModel(query)
    case 'buyers-regist-distribution':
      return new BuyersRegistDistributionModel(query)
    case 'suppliers-regist':
      return new SuppliersRegistModel(query)
    case 'suppliers-regist-distribution':
      return new SuppliersRegistDistributiontModel(query)
    default:
      throw new Error('OKCHART::ERROR:: no model is defined.')
  }
}

export default buildModel
