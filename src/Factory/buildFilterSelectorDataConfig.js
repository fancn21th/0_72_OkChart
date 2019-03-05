import overview from '../Config/SelectorFilter/cfg-sf-overview'
import buyerRegistDistribution from '../Config/SelectorFilter/cfg-sf-buyer-regist-distribution'

const defaultConfig = {
  filter: null,
}

const buildSelectorFilter = ({ type }) => {
  switch (type) {
    case 'source-top-15':
      return defaultConfig
    case 'overview':
      return overview
    case 'buyers-regist-distribution':
      return buyerRegistDistribution
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildSelectorFilter
