import overview from '../Config/SelectorFilter/cfg-sf-overview'
import buyerRegistDistribution from '../Config/SelectorFilter/cfg-sf-buyer-regist-distribution'
import supplierRegistDistribution from '../Config/SelectorFilter/cfg-sf-supplier-regist-distribution'
import distribution from '../Config/SelectorFilter/cfg-sf-distribution'
import pvuv from '../Config/SelectorFilter/cfg-sf-pv-uv'
import okCustomerOverview from '../Config/SelectorFilter/cfg-sf-ok-customer-overview'
import okCustomer from '../Config/SelectorFilter/cfg-sf-ok-customer'

const commonConfig = {
  filter: ['isQuerySelector', 'isFilterSelector'],
}

const mergeConfig = ({
  default: { filter: defaultFilter },
  custom: { filter: customFilter },
}) => ({
  filter: [...defaultFilter, ...customFilter],
})

const buildSelectorFilter = ({ type }) => {
  switch (type) {
    case 'source-top-15':
    case 'buyers-regist':
    case 'suppliers-regist':
      return commonConfig
    case 'ok-customer':
      return mergeConfig({
        default: commonConfig,
        custom: okCustomer,
      })
    case 'ok-customer-overview':
      return mergeConfig({
        default: commonConfig,
        custom: okCustomerOverview,
      })
    case 'pv-uv':
      return mergeConfig({
        default: commonConfig,
        custom: pvuv,
      })
    case 'distribution':
      return mergeConfig({
        default: commonConfig,
        custom: distribution,
      })
    case 'overview':
      return mergeConfig({
        default: commonConfig,
        custom: overview,
      })
    case 'buyers-regist-distribution':
      return mergeConfig({
        default: commonConfig,
        custom: buyerRegistDistribution,
      })
    case 'suppliers-regist-distribution':
      return mergeConfig({
        default: commonConfig,
        custom: supplierRegistDistribution,
      })
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildSelectorFilter
