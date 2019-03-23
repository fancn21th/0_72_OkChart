import overview from '../Config/Model/cfg-m-overview'
import pvUv from '../Config/Model/cfg-m-pv-uv'
import sourceTop15 from '../Config/Model/cfg-m-source-top-15'
import buyerRegist from '../Config/Model/cfg-m-buyer-regist'
import supplierRegist from '../Config/Model/cfg-m-supplier-regist'
import distribution from '../Config/Model/cfg-m-distribution'
import buyerRegistDistribution from '../Config/Model/cfg-m-buyer-regist-distribution'
import suppliersRegistDistribution from '../Config/Model/cfg-m-suppliers-regist-distribution'

import filterDateByWorkingDate from '../Utils/pipeline/dateFilter'
import { groupByFieldIdx, sortByFieldIdx } from '../Utils/pipeline/dateGrouping'

const buildViewPip = ({ viewType }) => {
  const common = {
    universal: [filterDateByWorkingDate, groupByFieldIdx, sortByFieldIdx],
  }
  switch (viewType) {
    case 'overview':
      return {
        ...common,
        custom: overview.customConverters,
      }
    case 'pv-uv':
      return {
        ...common,
        custom: pvUv.customConverters,
      }
    case 'source-top-15':
      return {
        ...common,
        custom: sourceTop15.customConverters,
      }
    case 'buyers-regist':
      return {
        ...common,
        custom: buyerRegist.customConverters,
      }
    case 'suppliers-regist':
      return {
        ...common,
        custom: supplierRegist.customConverters,
      }
    case 'distribution':
      return {
        ...common,
        custom: distribution.customConverters,
      }
    case 'buyers-regist-distribution':
      return {
        ...common,
        custom: buyerRegistDistribution.customConverters,
      }
    case 'suppliers-regist-distribution':
      return {
        ...common,
        custom: suppliersRegistDistribution.customConverters,
      }
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildViewPip
