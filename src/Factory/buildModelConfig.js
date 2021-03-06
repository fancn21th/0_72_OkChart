import overview from '../Config/Model/cfg-m-overview'
import sourceTop15 from '../Config/Model/cfg-m-source-top-15'
import buyerRegist from '../Config/Model/cfg-m-buyer-regist'
import supplierRegist from '../Config/Model/cfg-m-supplier-regist'
import buyerRegistDistribution from '../Config/Model/cfg-m-buyer-regist-distribution'
import pvUv from '../Config/Model/cfg-m-pv-uv'
import distribution from '../Config/Model/cfg-m-distribution'
import suppliersRegistDistribution from '../Config/Model/cfg-m-suppliers-regist-distribution'
import okCustomerOverview from '../Config/Model/cfg-m-ok-customer-overview'
import okCustomer from '../Config/Model/cfg-m-ok-customer'

const buildModelConfig = ({ type }) => {
  switch (type) {
    case 'ok-customer-overview':
      return okCustomerOverview
    case 'ok-customer':
      return okCustomer
    case 'overview':
      return overview
    case 'pv-uv':
      return pvUv
    case 'distribution':
      return distribution
    case 'source-top-15':
      return sourceTop15
    case 'buyers-regist-distribution':
      return buyerRegistDistribution
    case 'buyers-regist':
      return buyerRegist
    case 'suppliers-regist':
      return supplierRegist
    case 'suppliers-regist-distribution':
      return suppliersRegistDistribution
    default:
      throw new Error('OKCHART::ERROR:: no model config is defined.')
  }
}

export default buildModelConfig
