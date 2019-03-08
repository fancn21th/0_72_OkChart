import overview from '../Config/QueryConverter/cfg-qc-overviews'
import sourceTop15 from '../Config/QueryConverter/cfg-qc-source-top-15'
import buyerRegist from '../Config/QueryConverter/cfg-qc-buyer-regist'
import supplierRegist from '../Config/QueryConverter/cfg-qc-supplier-regist'
import buyerRegistDistribution from '../Config/QueryConverter/cfg-qc-buyer-regist-distribution'
import pvUv from '../Config/QueryConverter/cfg-qc-pv-uv'
import distribution from '../Config/QueryConverter/cfg-qc-distribution'
import suppliersRegistDistribution from '../Config/QueryConverter/cfg-qc-suppliers-regist-distribution'

const buildQueryConverterConfig = ({ type }) => {
  switch (type) {
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
      throw new Error('OKCHART::ERROR:: no query converter config is defined.')
  }
}

export default buildQueryConverterConfig
