import filterDateByWorkingDate from '../Utils/pipeline/dateFilter'
import { groupByFieldIdx, sortByFieldIdx } from '../Utils/pipeline/dateGrouping'

const buildViewPip = ({ viewType }) => {
  switch (viewType) {
    case 'source-top-15':
    case 'pv-uv':
    case 'buyers-regist':
    case 'suppliers-regist':
    case 'distribution':
    case 'overview':
    case 'buyers-regist-distribution':
    case 'suppliers-regist-distribution':
      return [filterDateByWorkingDate, groupByFieldIdx, sortByFieldIdx]
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildViewPip
