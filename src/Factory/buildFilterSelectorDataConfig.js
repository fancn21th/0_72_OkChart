import overview from '../Config/SelectorFilter/cfg-sf-overview'
import buyerRegistDistribution from '../Config/SelectorFilter/cfg-sf-buyer-regist-distribution'
import distribution from '../Config/SelectorFilter/cfg-sf-distribution'

const defaultConfig = {
  filter: null,
}

const buildSelectorFilter = ({
  type
}) => {
  switch (type) {
    case 'source-top-15':
    case 'pv-uv':
    case 'buyers-regist':
    case 'suppliers-regist':
      return defaultConfig
    case 'distribution':
      return distribution
    case 'overview':
      return overview
    case 'buyers-regist-distribution':
      return buyerRegistDistribution
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildSelectorFilter
