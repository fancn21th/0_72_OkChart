import filterSelectorData from '../Utils/pipeline/filterSelectorData'
import queryConverter from '../Utils/pipeline/queryConverter'

const buildQueryPip = ({ viewType }) => {
  switch (viewType) {
    case 'source-top-15':
    case 'pv-uv':
    case 'buyers-regist':
    case 'suppliers-regist':
    case 'distribution':
    case 'overview':
    case 'buyers-regist-distribution':
    case 'suppliers-regist-distribution':
    case 'ok-customer-overview':
    case 'ok-customer':
      // the execution order of pipeline matters
      return [filterSelectorData, queryConverter]
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildQueryPip
